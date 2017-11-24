var socket= io();

    socket.on('connect', function(){
        console.log('connected to server');

});

    socket.on('disconnect', function(){
        console.log('disconnected from server');
    });

    socket.on('newChat', function(newChat){
        console.log('Got new chat from server', newChat);

        var li=jQuery('<li></li>');
        li.text(`${newChat.from}:${newChat.text}`);
        jQuery('#messages').append(li);
    });

    /*socket.emit('createChat',{
        from: 'Sam',
        text: 'Whatzz up'
    }, function(data){
        console.log('Got it', data);
    });*/

    jQuery('#message-form').on('submit',function(e){
        e.preventDefault();

        socket.emit('createChat',{
            from: 'User',
            text: jQuery('[name=message]').val()
        }, function(){

        });
    });