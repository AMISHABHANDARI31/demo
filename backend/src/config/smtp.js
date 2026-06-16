const nodemailer = require("nodemailer");

const requiredSmtpEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM"
];

const missingSmtpEnv = requiredSmtpEnv.filter((key) => !process.env[key]);

let transporter = null;

if (missingSmtpEnv.length > 0) {
  console.warn(
    `SMTP not configured. Missing ${missingSmtpEnv.join(", ")}. OTP email features will return a service unavailable response.`
  );
} else {
  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } catch (error) {
    console.warn(`SMTP transporter could not be created: ${error.message}`);
    transporter = null;
  }
}

const verifySmtpConnection = async () => {
  if (!transporter) {
    console.warn("SMTP verify skipped because SMTP is not configured.");
    return false;
  }

  try {
    await transporter.verify();
    console.log("SMTP connection verified successfully");
    return true;
  } catch (error) {
    console.warn(`SMTP verify failed: ${error.message}`);
    return false;
  }
};

module.exports = {
  transporter,
  isEmailServiceConfigured: Boolean(transporter),
  verifySmtpConnection
};
