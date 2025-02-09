const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server,{ cors: { origin: "*", methods: ["GET", "POST"] } });


io.on('connection', (socket) => {
    

    socket.on('disconnect', () => {
        console.log(socket.nick + ' disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('register', (nick) => {
        socket.nick = nick;
        console.log(nick + ' connected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});