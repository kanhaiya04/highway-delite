import express, { Express } from "express";
import { connect } from "mongoose";

const dotenv = require("dotenv");
const otpRoute = require("./routes/otpRoutes");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

const mongodbURL = process.env.MONGO_URL || "";

(async function () {
  try {
    await connect(mongodbURL);
    console.log("Connected to MongoDB!");
  } catch (error: any) {
    console.log(error.message);
  }
})();

const app: Express = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use("/otp", otpRoute);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
