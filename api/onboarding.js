import sendgrid from "@sendgrid/mail";
import fetch from "node-fetch";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx2e784wDn82nBacfS78AwL147WhtIBuQurqiZ3kncp5GPiC9z1jvVvrjFjX3VUBi9OjQ/exec';

export default async function handler(req, res) {
  console.log("Received request:", req.method);

  if (req.method !== "POST") {
    console.warn("Invalid method:", req.method);
    return res.status(405).send("Method Not Allowed");
  }

  const { interests = [], identities = [], email, message } = req.body || {};
  console.log("Parsed body:", { email, interests, identities, message });

  if (!email) {
    console.warn("Email missing from request body.");
    return res.status(400).json({ error: "Email is required." });
  }

  const formattedHTML = `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6;">
    <h2 style="color: #000;">New Onboarding Submission</h2>
    <p>A new onboarding form was submitted through the Maeknit website:</p>
    <table style="margin-top: 20px; border-collapse: collapse;">
      <tr><td style="padding: 8px 12px; font-weight: bold;">Email:</td><td style="padding: 8px 12px;">${email}</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold;">Interests:</td><td style="padding: 8px 12px;">${interests.join(", ") || "N/A"}</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold;">Identity:</td><td style="padding: 8px 12px;">${identities.join(", ") || "N/A"}</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold;">Message:</td><td style="padding: 8px 12px;">${message?.replace(/\n/g, "<br/>") || "N/A"}</td></tr>
    </table>
    <p style="margin-top: 40px; font-size: 14px; color: #777;">— Maeknit Automated Submission System</p>
  </div>`;

  const confirmationHTML = `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
    <h2 style="color: #000;">Thank you for reaching out to Maeknit!</h2>
    <p>We've received your onboarding form and will be in touch soon.</p>
    <p>Here's a summary of your submission:</p>
    <ul>
      <li><strong>Interests:</strong> ${interests.join(", ") || "N/A"}</li>
      <li><strong>Identity:</strong> ${identities.join(", ") || "N/A"}</li>
      <li><strong>Message:</strong> ${message || "N/A"}</li>
    </ul>
    <p style="margin-top: 30px; font-size: 14px; color: #777;">This is an automated confirmation. Thank you!</p>
  </div>`;

  try {
    console.log("Sending internal email...");
    await sendgrid.send({
      to: "intel@maeknit.io",
      from: "onboarding@maeknit.io",
      subject: "New Onboarding Submission",
      html: formattedHTML,
    });

    console.log("Sending confirmation email...");
    await sendgrid.send({
      to: email,
      from: "Maeknit INC <intel@maeknit.io>",
      subject: "We've received your onboarding form!",
      html: confirmationHTML,
    });

    if (!GOOGLE_SHEETS_URL) {
      console.error("GOOGLE_SHEETS_URL is not defined.");
    } else {
      console.log("Sending to Google Sheets:", GOOGLE_SHEETS_URL);
      const sheetRes = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interests, identities, message }),
      });

      const text = await sheetRes.text();
      console.log("Google Sheets response:", sheetRes.status, text);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error during submission flow:", err.message, err);
    return res.status(500).json({ error: "Submission failed." });
  }
}
