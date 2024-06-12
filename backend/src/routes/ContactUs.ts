import express from "express";
import { contactUs, joinAppointment, userAppointment } from "../controllers/ContactUs";

const app = express.Router();

app.post("/form", contactUs);      // /api/v1/contact-us/form
app.post("/appointment", userAppointment);      // /api/v1/contact-us/appointment
app.post("/join-appointment", joinAppointment);      // /api/v1/contact-us/join-appointment

export default app;
