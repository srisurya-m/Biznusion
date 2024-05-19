import express from "express";
import { dataAnalyst } from "../controllers/DataAnalyst";

const app = express.Router();

app.post("/form", dataAnalyst);      // /api/v1/data-analyst/form

export default app;
