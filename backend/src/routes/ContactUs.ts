import express from "express";
import { contactUs } from "../controllers/ContactUs";

const app = express.Router();

app.post("/form", contactUs);      // /api/v1/contact-us/form

export default app;
