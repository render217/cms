import app from "./app";
import dotenv from "dotenv";
import http, { createServer } from "http";
// import { Server } from "socket.io";
dotenv.config();

const PORT = process.env.PORT || 4000;

const server = createServer(app);
// const io = new Server(server);

// io.on("connection", (socket) => {
//     console.log("New connection", socket.id);
//     socket.on("disconnect", () => {
//         console.log("Disconnected", socket.id);
//     });
// });

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
