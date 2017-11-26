const express=require('express');
var path=require('path');
var http= require('http');
const socketIO= require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');
const {Users} =require('./utils/users.js');

const publicPath= path.join(__dirname,'../public');
const port= process.env.PORT || 3000;

var app = express();
var server= http.createServer(app);
var io= socketIO(server);
var users=new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.on('join',(params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback("Name and room name are required");
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //socket.leave(params.room);
        //io.emit -> io.to(params.room).emit
        //socket.broadcast.emit -> socket.broadcast.to(params.room).emit

        socket.emit('newChat', generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newChat',generateMessage('Admin',`${params.name} has joined`));

        callback();
});

    socket.on('createChat', (chat,callback) => {
        console.log('new chat:', chat);
        io.emit('newChat', generateMessage(chat.from, chat.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.longitude,coords.latitude));
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newChat', generateMessage('Admin',`${user.name} has left`));
        }
});
});

server.listen(port, () => {
    console.log(`The server has started on port ${port}`);
});