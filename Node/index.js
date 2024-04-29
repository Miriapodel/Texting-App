import express from "express";
import cors from "cors";
import defaultRoute from "./routes/defaultRoute.js";
import * as paths from "./utils/paths.js";
import http from "http";
import {Server} from "socket.io";
import BadWordsFilter from "bad-words";
import createMessage from "./utils/createMessage.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;


app.use(cors());
app.use(express.static(paths.reactPath));

app.use(defaultRoute);

const badWordsFilter = new BadWordsFilter();

io.on("connection", (socket) => {
    socket.emit("message", createMessage("Welcome!"));

    socket.broadcast.emit("sendMessage", createMessage("A new user has joined! :)"));

    socket.on("sendMessage", (message, callback) => {
        if(badWordsFilter.isProfane(message)){
            message = badWordsFilter.clean(message);
        }

        const messageObject = createMessage(message);
        
        io.emit("sendMessage", messageObject);
    
        callback("");
    });

    socket.on("sendLocation", (data, callback) => {
        const message = `https://www.google.com/maps/?q=${data.latitude},${data.longitude}`;

        callback();

        io.emit("sendLocation", createMessage(message));
    });

    socket.on("disconnect", () => {
        io.emit("sendMessage", createMessage("A user has left the chat :("));
    });
});


server.listen(PORT, () => {
    console.log(`Server connected to port ${PORT}`);
});