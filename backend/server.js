import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
// DB_MONGO_URI=mongodb://Raja-Rehman:raja0000@ac-bcs4bsg-shard-00-00.h12kepo.mongodb.net:27017,ac-bcs4bsg-shard-00-01.h12kepo.mongodb.net:27017,ac-bcs4bsg-shard-00-02.h12kepo.mongodb.net:27017/?ssl=true&replicaSet=atlas-8p93ab-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
// NODE_ENV=develpment
// PORT=8000
// SOCKET_ENV=https://chat-app-x4fw.onrender.com
// JWT_SECRET=dexo2n4i7dtn8sri8do