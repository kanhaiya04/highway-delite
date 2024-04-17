import { Request, Response } from "express";
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).json({
      success: true,
      message: "User logged in successfully",
      token: authToken,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
