export function getConfig() {
    const {
      ODOO_URL,
      ODOO_DB,
      ODOO_USERNAME,
      ODOO_PASSWORD,
      SENDGRID_API_KEY,
      GOOGLE_SHEETS_WEBHOOK_URL,
    } = process.env;
  
    if (!ODOO_URL || !ODOO_DB || !ODOO_USERNAME || !ODOO_PASSWORD) {
      console.warn("⚠️ Missing one or more Odoo env variables");
    }
  
    return {
      ODOO_URL,
      ODOO_DB,
      ODOO_USERNAME,
      ODOO_PASSWORD,
      SENDGRID_API_KEY,
      GOOGLE_SHEETS_WEBHOOK_URL,
    };
  }
  