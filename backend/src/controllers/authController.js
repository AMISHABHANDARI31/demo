const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateOtp = require("../utils/generateOtp");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const getOtpExpiryDate = () => {
  const minutes = Number(process.env.OTP_EXPIRES_IN_MINUTES) || 10;
  return new Date(Date.now() + minutes * 60 * 1000);
};

const buildOtpEmail = (otp, purpose) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>${purpose}</h2>
      <p>Your verification OTP is:</p>
      <h1 style="letter-spacing: 4px;">${otp}</h1>
      <p>This OTP will expire in ${process.env.OTP_EXPIRES_IN_MINUTES || 10} minutes.</p>
    </div>
  `;
};

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt
});

const respondToOtpEmailError = (res, error) => {
  if (error.message === "Email service is not configured") {
    return res.status(503).json({
      success: false,
      message: "Email service is not configured. OTP cannot be sent."
    });
  }

  return res.status(error.statusCode || 503).json({
    success: false,
    message: "OTP email could not be sent. Please try again later."
  });
};

const verifyOtpForUser = async (user, otp) => {
  if (!user.otp || !user.otpExpiresAt) {
    return "OTP not found. Please request a new OTP.";
  }

  if (user.otpExpiresAt < new Date()) {
    return "OTP has expired. Please request a new OTP.";
  }

  const isOtpValid = await bcrypt.compare(otp, user.otp);

  if (!isOtpValid) {
    return "Invalid OTP";
  }

  return null;
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    try {
      await sendEmail({
        to: email,
        subject: "Verify your account OTP",
        html: buildOtpEmail(otp, "Account verification")
      });
    } catch (error) {
      return respondToOtpEmailError(res, error);
    }

    await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      otp: hashedOtp,
      otpExpiresAt: getOtpExpiryDate()
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to your email."
    });
  } catch (error) {
    next(error);
  }
};

const verifyRegisterOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    const user = await User.findOne({ email }).select("+otp +otpExpiresAt");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const otpError = await verifyOtpForUser(user, otp);

    if (otpError) {
      return res.status(400).json({
        success: false,
        message: otpError
      });
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token: generateToken(user._id),
      user: formatUser(user)
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    try {
      await sendEmail({
        to: user.email,
        subject: "Your login OTP",
        html: buildOtpEmail(otp, "Login verification")
      });
    } catch (error) {
      return respondToOtpEmailError(res, error);
    }

    user.otp = hashedOtp;
    user.otpExpiresAt = getOtpExpiryDate();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login OTP sent to your email"
    });
  } catch (error) {
    next(error);
  }
};

const verifyLoginOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    const user = await User.findOne({ email }).select("+otp +otpExpiresAt");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const otpError = await verifyOtpForUser(user, otp);

    if (otpError) {
      return res.status(400).json({
        success: false,
        message: otpError
      });
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login verified successfully",
      token: generateToken(user._id),
      user: formatUser(user)
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: formatUser(req.user)
  });
};

module.exports = {
  register,
  verifyRegisterOtp,
  login,
  verifyLoginOtp,
  getProfile
};
