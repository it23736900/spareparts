import nodemailer from "nodemailer";

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true if 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendInquiryEmail(to, name, refCode) {
  const mailOptions = {
    from: `"EuroTec Automotive" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Inquiry Confirmation",
    html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for your inquiry. We will get back to you within 2 days.</p>
      <p>Your reference code is: <b>${refCode}</b></p>
      <br/>
      <p>EuroTec Automotive Team</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}
