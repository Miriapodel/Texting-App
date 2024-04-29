import express from "express";
import cors from "cors";
import defaultRoute from "./routes/defaultRoute.js";
import * as paths from "./utils/paths.js";
import http from "http";
import {Server} from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;


app.use(cors());
app.use(express.static(paths.reactPath));

app.use(defaultRoute);

io.on("connection", (socket) => {
    socket.emit("message", "Welcome!");

    socket.broadcast.emit("sendMessage", "A new user has joined! :)");

    socket.on("sendMessage", (message) => {
        io.emit("sendMessage", message);
    });

    socket.on("sendLocation", (data) => {
        const message = `https://www.google.com/maps/?q=${data.latitude},${data.longitude}`;

        io.emit("sendMessage", message);
    })

    socket.on("disconnect", () => {
        io.emit("sendMessage", "A user has left the chat :(");
    });
});


server.listen(PORT, () => {
    console.log(`Server connected to port ${PORT}`);
});