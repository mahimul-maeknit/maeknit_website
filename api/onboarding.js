import sendgrid from "@sendgrid/mail";
import { createOdooLead } from "../lib/odooClient.js";
import { getConfig } from "../lib/config.js";

const { SENDGRID_API_KEY, GOOGLE_SHEETS_WEBHOOK_URL } = getConfig();
sendgrid.setApiKey(SENDGRID_API_KEY || "");

export default async function handler(req, res) {
  console.log("Received request:", req.method);

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { name, interests = [], identity, email, message } = req.body || {};

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required." });
  }

  const formattedHTML = `
    <div style="font-family: Arial; font-size: 16px;">
      <h2>New Onboarding Submission</h2>
      <p><strong>Name:</strong> ${name || "N/A"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Interests:</strong> ${interests.join(", ") || "N/A"}</p>
      <p><strong>Identity:</strong> ${identity || "N/A"}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    </div>`;

  const confirmationHTML = `
    <div style="font-family: Arial; font-size: 16px;">
      <h2>Thank you for reaching out to Maeknit!</h2>
      <p>We've received your submission.</p>
      <p><strong>Name:</strong> ${name || "N/A"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Interests:</strong> ${interests.join(", ") || "N/A"}</p>
      <p><strong>Identity:</strong> ${identity || "N/A"}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    </div>`;

  try {
    // Internal email
    await sendgrid.send({
      to: "intel@maeknit.io",
      from: "onboarding@maeknit.io",
      subject: "New Onboarding Submission",
      html: formattedHTML,
    });

    // Confirmation email
    await sendgrid.send({
      to: email,
      from: "Maeknit INC <intel@maeknit.io>",
      subject: "We've received your onboarding form!",
      html: confirmationHTML,
    });

    // Google Sheets
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      console.log('Google sheets ok');
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interests, identity, message }),
      });
    }

    // Push to Odoo
    await createOdooLead({ name, email, interests, identity, message });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Submission error:", err);
    return res.status(500).json({ error: "Submission failed." });
  }
}
