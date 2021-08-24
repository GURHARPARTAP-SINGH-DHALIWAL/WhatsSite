const express=require('express');
const http=require('http');
const path=require('path');
const socketio=require('socket.io');
const port=process.env.PORT||8000;
const {formatMessage}=require('./utils/messages');
const {addUser,findUserById}=require('./utils/users');

const admin='Admin-GSD';
const app=express();


// Because we have to connect socket io to this server we created it using http 
const server=http.createServer(app);

// it will look in pubic for statics
app.use(express.static('public'));

// linked soccket to this server
const io=socketio(server);

// whenever a client make a request to this server a socket is connected between the two and all the function will be done here
io.on('connection',  socket=>{
     
     socket.on('joinRoom',(name,room)=>{
          
        console.log('here',name,room,socket.id);

      
        console.log('added');
        socket.join(room);
        const user=addUser(socket.id,name,room);

         // Sedn to client who sene the request
    socket.emit('message',formatMessage(admin,'welcome to WhatsSite'));

    // braodcast to every client except the one who made the request
    socket.broadcast.to(user.room).emit('message',formatMessage(admin,`${user.name} has joined the chat`));




    });
    console.log('here');
    // on coinnectinf we will enter this method and all the emis will be executed and all other functions will become active
    console.log('New socket created');
    

   

    // to evry client
    socket.on('disconnect',()=>{
        const user=findUserById(socket.id);
        io.to(user.room).emit('message',formatMessage(admin,`${user.name} has left the chat`));
    });

    // Receives chat message

    socket.on('chatMessage',msg=>{  
        const user=findUserById(socket.id); 
        console.log(user); 
        io.to(user.room).emit('message',formatMessage(user.name, msg)); 
    });

});



server.listen(port,()=>console.log('Server successfully Running'));

