const express=require('express');
var path=require('path');
var http= require('http');
const socketIO= require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath= path.join(__dirname,'../public');
const port= process.env.PORT || 3000;

var app = express();
var server= http.createServer(app);
var io= socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newChat', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newChat',generateMessage('Admin','New user joined'));

    socket.on('createChat', (chat,callback) => {
        console.log('new chat:', chat);
        io.emit('newChat', generateMessage(chat.from, chat.text));
        callback('From server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.longitude,coords.latitude));
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});



server.listen(port, () => {
    console.log(`The server has started on port ${port}`);
});