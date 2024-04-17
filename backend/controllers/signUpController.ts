import { Request, Response } from "express";
const OTP = require("../models/otpModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, contactMode, otp } = req.body;
    // Check if all details are provided
    if (
      !firstName ||
      !lastName ||
      !contactMode ||
      !email ||
      !password ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Hashing password error for ${password}: ` + error.message,
      });
    }
    const newUser = await User.create({
      firstName,
      lastName,
      contactMode,
      email,
      password: hashedPassword,
    });
    const data = {
      user: {
        id: newUser.id,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: authToken,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
