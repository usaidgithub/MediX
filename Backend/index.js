import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/mongodb.js";
import UserRouter from "./routes/Users.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const socketio = require('socket.io');
import http from 'http';
import path from "path";
import ChatRouter from "./routes/Chat.js";

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware and Static Files
app.set("view engine", "ejs");
app.use(express.static(path.join(process.cwd(), "public"))); 
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authorization headers
};
app.use(cors(corsOptions));

// Routes
app.use("/users", UserRouter);
app.use("/chat", ChatRouter);
// Socket.IO Configuration
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// EJS View Route
app.get("/map", (req, res) => {
  res.render("index");
});

// Root Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
