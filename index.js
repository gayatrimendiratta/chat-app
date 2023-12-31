const express = require('express');
const app = express();
const path =require('path');
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;
app.use(express.static(path.join(__dirname,"public")))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
  
io.on('connection', (socket) => {
    socket.on('send name', (username) => {
        io.emit('send name', (username));
    });
  
    socket.on('send message', (chat) => {
        io.emit('send message', (chat));
    });
});
  
server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});