const express=require('express');
var path=require('path');
var http= require('http');
const socketIO= require('socket.io');

const {generateMessage} = require('./utils/message');

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
        /*socket.broadcast.emit('newChat', {
            from: chat.from,
            text: chat.text,
            createdAt: new Date().getTime()
        });*/
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});



server.listen(port, () => {
    console.log(`The server has started on port ${port}`);
});