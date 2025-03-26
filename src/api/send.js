const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end("Method Not Allowed");

  const { name, email, message, imageBase64 } = req.body;

  if (!name || !email || !message || !imageBase64) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await sgMail.send({
      to: "tech@maeknit.io",
      from: "no-reply@maeknit.com",
      subject: `New Design from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
      attachments: [
        {
          content: imageBase64.split(',')[1],
          filename: "design.png",
          type: "image/png",
          disposition: "attachment",
        },
      ],
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SendGrid error" });
  }
}
