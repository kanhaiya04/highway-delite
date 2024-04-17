import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: "string",
    required: true,
    trim: true,
  },
  lastName: {
    type: "string",
    required: true,
    trim: true,
  },
  email: {
    type: "string",
    required: true,
    trim: true,
  },
  password: {
    type: "string",
    required: true,
  },
  contactMode: {
    type: "string",
    enum: ["phone", "email"],
    required: true,
  },
});

module.exports = model("User", userSchema);
