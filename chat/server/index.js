const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server,{ cors: { origin: "*", methods: ["GET", "POST"] } });


io.on('connection', (socket) => {
    console.log( socket.id + ' user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);
        io.emit('chat message', msg);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});