var socket= io();

    socket.on('connect', function(){
        console.log('connected to server');

        socket.emit('createChat', {
        to: 'jen@example.com',
        text: 'I am fine'
    });
});

    socket.on('disconnect', function(){
        console.log('disconnected from server');
    });

    socket.on('newChat', function(newChat){
        console.log('Got new chat from server', newChat);
    });
