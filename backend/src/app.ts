import express from "express";
import { config } from "dotenv";
import { connectDB } from "./utils/features";
import cors from "cors";
import crypto from "node:crypto";

if (!globalThis.crypto) {
  globalThis.crypto = crypto as any;
}

//importing routes
import webdevRoute from "./routes/Webdev";
import contactUsRoute from "./routes/ContactUs";
import dataAnalystRoute from "./routes/DataAnalyst";
import userRoute from "./routes/User";

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use(cors());

config({
  path: "./.env",
});

connectDB(process.env.MONGO_URI as string);

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

app.use("/api/v1/web-dev", webdevRoute);
app.use("/api/v1/data-analyst", dataAnalystRoute);
app.use("/api/v1/contact-us", contactUsRoute);
app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
