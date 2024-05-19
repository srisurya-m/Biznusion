import express from "express";
import { webdev } from "../controllers/Webdev";

const app = express.Router();

app.post("/form", webdev);      // /api/v1/web-dev/form

export default app;
