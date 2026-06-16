const { transporter } = require("../config/smtp");

const sendEmail = async ({ to, subject, html }) => {
  if (!transporter) {
    const error = new Error("Email service is not configured");
    error.statusCode = 503;
    throw error;
  }

  try {
    return await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html
    });
  } catch (error) {
    console.error(`Email send failed: ${error.message}`);

    const emailError = new Error("Email could not be sent. Please try again later.");
    emailError.statusCode = 503;
    emailError.originalError = error;
    throw emailError;
  }
};

module.exports = sendEmail;
