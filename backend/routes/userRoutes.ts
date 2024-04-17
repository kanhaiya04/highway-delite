import express from "express";
const router = express.Router();
const signUpController = require("../controllers/signUpController");
const loginController = require("../controllers/loginController");
router.post("/signUp", signUpController.signUp);
router.post("/logIn", loginController.login);
module.exports = router;
