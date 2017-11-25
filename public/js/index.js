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


    socket.on('newLocationMessage', function(message){
        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_blank">My Current Location </a>');

        li.text(`${message.from}: `);
        a.attr('href',message.url);
        li.append(a);
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

        var messageTextbox = jQuery('[name=message]');
        socket.emit('createChat',{
            from: 'User',
            text: messageTextbox.val()
        }, function(){
            messageTextbox.val('');
        });
    });

    var locationButton=jQuery('#send-location');
    locationButton.on('click', function(){
        if(!navigator.geolocation){
           return alert('Geolocation not supported by your browser');
        }

        locationButton.attr('disabled','disabled').text('Sending Location...');

        navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
        },function(){
            locationButton.removeAttr('disabled').text('Send Location');
            alert('Unable to fetch location');
        });
    });