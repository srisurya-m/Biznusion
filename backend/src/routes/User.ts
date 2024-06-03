import express from "express";
import {
  getUser,
  loginUser,
  loginVerifyUser,
  newUser,
  registerChallengeUser,
  registerVerifyUser,
  updateUser,
} from "../controllers/User";
import { singleUpload } from "../middlewares/multer";

const app = express.Router();

app.post("/new", newUser); // /api/v1/user/new
app.post("/register-challenge/:id", registerChallengeUser); // /api/v1/user/register-challenge/:id
app.post("/register-verify/:id", registerVerifyUser); // /api/v1/user/register-verify/:id
app.post("/login-challenge", loginUser); // /api/v1/user/login-challenge
app.post("/login-verify", loginVerifyUser); // /api/v1/user/login-verify
app.get("/:id", getUser); // /api/v1/user/:id
app.put("/update-user/:id", singleUpload, updateUser); // /api/v1/user/update-user/:id

export default app;
