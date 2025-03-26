import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { interests = [], identities = [], email, message } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required." });

  const formattedHTML = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6;">
      <h2 style="color: #000;">New Onboarding Submission</h2>
      <p>A new onboarding form was submitted through the Maeknit website:</p>

      <table style="margin-top: 20px; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 12px; font-weight: bold;">Email:</td>
          <td style="padding: 8px 12px;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: bold;">Interests:</td>
          <td style="padding: 8px 12px;">${interests.join(", ") || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: bold;">Identity:</td>
          <td style="padding: 8px 12px;">${identities.join(", ") || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: bold;">Message:</td>
          <td style="padding: 8px 12px;">${
            message?.replace(/\n/g, "<br/>") || "N/A"
          }</td>
        </tr>
      </table>

      <p style="margin-top: 40px; font-size: 14px; color: #777;">— Maeknit Automated Submission System</p>
    </div>
  `;

  const confirmationHTML = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #000;">Thank you for reaching out to Maeknit!</h2>
      <p>We've received your onboarding form and will be in touch soon.</p>

      <p>Here's a summary of your submission:</p>
      <ul>
        <li><strong>Interests:</strong> ${interests.join(", ") || "N/A"}</li>
        <li><strong>Identity:</strong> ${identities.join(", ") || "N/A"}</li>
        <li><strong>Message:</strong> ${message || "N/A"}</li>
      </ul>

      <p style="margin-top: 30px; font-size: 14px; color: #777;">This is an automated confirmation. Thank you!</p>
    </div>
  `;

  try {
    // Internal notification
    await sendgrid.send({
      to: "intel@maeknit.io",
      from: "onboarding@maeknit.io",
      subject: "New Onboarding Submission",
      html: formattedHTML,
    });

    // Confirmation to client
    await sendgrid.send({
      to: email,
      from: "intel@maeknit.io",
      subject: "We've received your onboarding form!",
      html: confirmationHTML,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("SendGrid Error:", err);
    return res.status(500).json({ error: "Submission failed." });
  }
}
