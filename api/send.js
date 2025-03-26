const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end("Method Not Allowed");
  }

  const { name, email, message, imageBase64 } = req.body;

  if (!name || !email || !message || !imageBase64) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await sgMail.send({
      to: "intel@maeknit.io",
      from: "Maeknit INC <leads@maeknit.io>",
      subject: `New Design Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6;">
          <h2 style="color: #000;">🧵 New Design Submission</h2>
          <p>You’ve received a new design submission via the Maeknit form. Here are the details:</p>

          <table style="margin-top: 20px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold;">Name:</td>
              <td style="padding: 8px 12px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold;">Email:</td>
              <td style="padding: 8px 12px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold;">Message:</td>
              <td style="padding: 8px 12px;">${message}</td>
            </tr>
          </table>

          <p style="margin-top: 30px;">The user also submitted an image. It’s attached to this email.</p>

          <p style="margin-top: 40px; font-size: 14px; color: #777;">— Maeknit Automated Submission System</p>
        </div>
      `,
      attachments: [
        {
          content: imageBase64.split(',')[1],
          filename: "design.png",
          type: "image/png",
          disposition: "attachment"
        }
      ]
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("SendGrid Error:", err);
    return res.status(500).json({ error: "SendGrid error" });
  }
}
