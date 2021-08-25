const socket=io();

const chatForm=document.getElementById("chat-form");
const chatMessages=document.querySelector('.chat-messages');
const roomName=document.getElementById('room-name');
const roomList=document.getElementById('users');

// on receiving message
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
}); 
 
const typing=document.getElementById('typing');

socket.on('typing',(message)=>{
    typing.innerText=message;
});


chatForm.addEventListener('keypress',()=>{
    socket.emit('typing',username);
});

console.log({username,room});

// Always join room when javascript file loaded connection is autoatically called

socket.emit('joinRoom',username,room);


socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputRoomUsers(users);
});



socket.on('message',(message)=>{
    console.log(message);
    outputMessage(message);
    typing.innerText='';

    chatMessages.scrollTop=chatMessages.scrollHeight;

});


chatForm .addEventListener('submit',(e)=>{
    // prevent default reloading
    e.preventDefault();
    console.log(e.target.elements);
    const msg=e.target.elements.msg.value;
    socket.emit('chatMessage',msg);

    e.target.elements.msg.value='';
    e.target.elements.msg.focus();

});

function outputMessage(msg)
{
    const div=document.createElement('div');
    div.classList.add('message');
     div.classList.add('bg-light');

    div.innerHTML=`	<p class="meta"><span>${msg.user}</span> <span>${msg.time}</span></p>
    <p class="text">
        ${msg.message}
    </p>`
    document.querySelector('.chat-messages').append(div);
}

function outputRoomName(room)
{
    roomName.innerText=room;
}

function outputRoomUsers(users)
{   
    roomList.innerHTML='';
    for (var i = 0; i < users.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.innerHTML=users[i].name;

        // Add it to the list:
        roomList.appendChild(item);
    }
}