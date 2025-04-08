import xmlrpc from "xmlrpc";
import { getConfig } from "./config.js";

// Interest → Odoo CRM Tag mapping
const interestToOdooTagMap = {
  "Rapid Prototyping": "Development",
  "Production": "Production",
  "Swatching": "Swatch Packages",
  "3D Sampling": "3D Sampling",
  "Knit Programming": "Programming",
};

// Identity → Odoo Contact Type mapping
const identityToContactTypeMap = {
  Brand: "brand",
  Vendor: "vendor",
  Student: "student",
  Factory: "factory",
  Designer: "brand",
  Buyer: "buyer",
};

/**
 * Resolve tag IDs from interest values
 */
async function getTagIds(models, db, uid, password, interests) {
  const tags = interests.length ? interests : ["Development"];

  const uniqueNames = [
    ...new Set(tags.map((interest) => interestToOdooTagMap[interest] || "Development")),
  ];

  return new Promise((resolve, reject) => {
    models.methodCall(
      "execute_kw",
      [
        db,
        uid,
        password,
        "crm.tag",
        "search_read",
        [[["name", "in", uniqueNames]]],
        { fields: ["id", "name"] },
      ],
      (err, tagRecords) => {
        if (err) {
          console.error("❌ Failed to fetch tags:", err);
          return reject(err);
        }

        const tagIds = tagRecords.map((tag) => tag.id);
        console.log("✅ Matched tag IDs:", tagIds);
        resolve(tagIds);
      }
    );
  });
}

function getCountryId(models, db, uid, password, countryCode) {
  console.log("🔍 Searching for country ID with country code", countryCode);
  return new Promise((resolve, reject) => {
    models.methodCall(
      "execute_kw",
      [
        db,
        uid,
        password,
        "res.country",
        "search_read",
        [[["code", "=", countryCode]]], // or use "name" if you're passing full country names
        { fields: ["id"], limit: 1 },
      ],
      (err, result) => {
        if (err || !result.length) {
          console.error("❌ Failed to find country:", err || "Not found");
          return resolve(null); // optional: pass null to skip it
        }

        resolve(result[0].id);
      }
    );
  });
}

/**
 * @param {Object} leadData
 * @param {string} leadData.name
 * @param {string} leadData.email
 * @param {string[]} leadData.interests
 * @param {string} leadData.identity
 * @param {string} leadData.message
 * @param {string} leadData.userCity
 * @param {string} leadData.userCountry
 * @param {string} leadData.userCountryCode
 */
export async function createOdooLead(leadData) {
  const {
    ODOO_URL,
    ODOO_DB,
    ODOO_USERNAME,
    ODOO_PASSWORD,
  } = getConfig();

  console.log("⚙️ Starting Odoo lead creation...");

  return new Promise((resolve, reject) => {
    const authURL = `${ODOO_URL}/xmlrpc/2/common`;
    const objectURL = `${ODOO_URL}/xmlrpc/2/object`;

    const common = xmlrpc.createClient({ url: authURL });

    common.methodCall(
      "authenticate",
      [ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD, {}],
      async (authErr, uid) => {
        if (authErr || !uid) {
          console.error("❌ Odoo auth failed:", authErr);
          return reject(authErr || new Error("Odoo authentication returned no UID"));
        }

        const models = xmlrpc.createClient({ url: objectURL });

        const isCompany = ["Brand", "Vendor", "Factory"].includes(leadData.identity);
        const contactType = identityToContactTypeMap[leadData.identity] || "individual";

        const countryId = await getCountryId(models, ODOO_DB, uid, ODOO_PASSWORD, leadData.userCountryCode);

        const contactPayload = {
          name: leadData.name || leadData.email,
          email: leadData.email,
          is_company: isCompany,
          contact_type: contactType,
          city: leadData.userCity || "",
          ...(countryId && { country_id: countryId }), // Only include if valid
        };
        // Step 1: Create contact
        models.methodCall(
          "execute_kw",
          [ODOO_DB, uid, ODOO_PASSWORD, "res.partner", "create", [contactPayload]],
          async (contactErr, contactId) => {
            if (contactErr || !contactId) {
              console.error("❌ Failed to create contact:", contactErr);
              return reject(contactErr || new Error("Odoo contact creation failed"));
            }

            console.log("✅ Contact created with ID:", contactId);

            // Step 2: Resolve tag IDs
            const tag_ids = await getTagIds(models, ODOO_DB, uid, ODOO_PASSWORD, leadData.interests);

            // Step 3: Create lead
            const leadPayload = {
              name: leadData.name || leadData.email,
              contact_name: leadData.name || leadData.email,
              email_from: leadData.email,
              partner_id: contactId,
              tag_ids: [[6, 0, tag_ids]],
              description: `Name: ${leadData.name || "N/A"}\nInterests: ${leadData.interests.join(", ")}, Identity: ${leadData.identity}, Message: ${leadData.message}`,
            };

            models.methodCall(
              "execute_kw",
              [ODOO_DB, uid, ODOO_PASSWORD, "crm.lead", "create", [leadPayload]],
              (leadErr, leadId) => {
                if (leadErr) {
                  console.error("❌ Failed to create lead:", leadErr);
                  return reject(leadErr);
                }

                console.log("✅ Lead created with ID:", leadId);
                resolve(leadId);
              }
            );
          }
        );
      }
    );
  });
}
