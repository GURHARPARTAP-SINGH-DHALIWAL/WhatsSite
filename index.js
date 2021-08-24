const express=require('express');
const http=require('http');
const path=require('path');
const socketio=require('socket.io');
const port=process.env.PORT||8000;


const app=express();


// Because we have to connect socket io to this server we created it using http 
const server=http.createServer(app);

// it will look in pubic for statics
app.use(express.static('public'));

// linked soccket to this server
const io=socketio(server);

// whenever a client make a request to this server a socket is connected between the two and all the function will be done here
io.on('connection',socket=>{
   

    // on coinnectinf we will enter this method and all the emis will be executed and all other functions will become active
    console.log('New socket created');
    // Sedn to client who sene the request
    socket.emit('message','welcome to WhatsSite');

    // braodcast to every client except the one who made the request
    socket.broadcast.emit('message','A user has joined the chat');

    // to evry client
    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat');
    });

    // Receives chat message

    socket.on('chatMessage',msg=>{
        io.emit('message',msg);
    });

});



server.listen(port,()=>console.log('Server successfully Running'));

