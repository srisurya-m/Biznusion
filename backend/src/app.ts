import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./utils/features";
import crypto from "node:crypto";
import bodyParser from "body-parser";

if (!globalThis.crypto) {
  globalThis.crypto = crypto as any;
}

//importing routes
import webdevRoute from "./routes/Webdev";
import contactUsRoute from "./routes/ContactUs";
import dataAnalystRoute from "./routes/DataAnalyst";
import userRoute from "./routes/User";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

connectDB(process.env.MONGO_URI as string);

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

app.use("/api/v1/web-dev", webdevRoute);
app.use("/api/v1/data-analyst", dataAnalystRoute);
app.use("/api/v1/contact-us", contactUsRoute);
app.use("/api/v1/user", userRoute);

app.use("/uploads/users", express.static("uploads/users"));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT,
    methods: ["GET", "POST"],
  },
  path: "/socket.io",
});

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected ", socket.id);

  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketIdToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incoming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });
  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

httpServer.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
