import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import deptRouter from "./routes/departmentRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import { createServer } from "node:http";
import { Server } from "socket.io";
import DB from "./database.js";

dotenv.config();
const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("message", ({ message_content, sender, receiver }) => {
    console.log("Message received");
    io.emit("message", { message_content, sender, receiver });

    const saveQuery =
      "INSERT INTO message (message_content, sender, receiver) VALUES (?,?,?)";
    DB.query(
      saveQuery,
      [message_content, sender, receiver],
      (error, result) => {
        if (error) {
          console.log("Error saving message to database: ", error);
        } else {
          console.log("Message saved to database");
        }
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/project", projectRouter);
app.use("/department", deptRouter);
app.use("/message", messageRouter);

server.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
