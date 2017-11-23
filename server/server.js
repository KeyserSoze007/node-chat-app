const express=require('express');
var path=require('path');
var http= require('http');
const socketIO= require('socket.io');

const publicPath= path.join(__dirname,'../public');
const port= process.env.PORT || 3000;

var app = express();
var server= http.createServer(app);
var io= socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newChat', {
        from: 'Admin',
        text: 'Welcome to the chat room',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newChat',{
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createChat', (chat) => {
        console.log('new chat:', chat);
        io.emit('newChat', {
            from: chat.from,
            text: chat.text,
            createdAt: new Date().getTime()
        });
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