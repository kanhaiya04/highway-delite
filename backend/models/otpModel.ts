import { Schema, model } from "mongoose";
const mailSender = require("../utils/mailSender");

const otpSchema = new Schema({
  email: {
    type: "string",
    required: true,
  },
  otp: {
    type: "string",
    required: true,
  },
  createdAt: {
    type: "Date",
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email: string, otp: string) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
             <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

//whenever a new document is saved to the database, the sendVerificationEmail function is called to send the email with opt.
otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
module.exports = model("OTP", otpSchema);
