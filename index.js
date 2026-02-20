const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "index.html"));
});

// io

io.on("connection", (socket) => {
    socket.on("joinRoom", (data) => {
        const clients = io.sockets.adapter.rooms.get(data.roomCode);
        const numClients = clients ? clients.size : 0;

        if (clients) {
            for (const clientId of clients) {
                const clientSocket = io.sockets.sockets.get(clientId);
                if (clientSocket && clientSocket.customName === data.name) {
                    socket.emit("error", "Name already taken in this room.");
                    return;
                }
            }
        }

        socket.customName = data.name;
        socket.join(data.roomCode);

        if (numClients > 0) {
            const hostId = Array.from(clients)[0];

            io.to(hostId).emit("getMap", { targetId: socket.id });
        }
    });

    socket.on("sendStateToTarget", ({ targetId, mapData }) => {
        io.to(targetId).emit("receiveMap", mapData);
    });

    // logic for a game(player, map...)
    socket.on("setPl", (data) => {
        socket.to(data.roomCode).emit("allPlayerOfRoom", data);
    });
    socket.on("diePl", (data) => {
        io.to(data.roomCode).emit("diePl", data);
    });

    socket.on("setMap", (data) => {
        socket.to(data.roomCode).emit("setMap", data);
    });
    socket.on("tntBang", (data) => {
        socket.to(data.roomCode).emit("tntBang", data);
    });
});

http.listen(PORT, () => {
    console.log(`server on http:localhost:${PORT}`);
});
