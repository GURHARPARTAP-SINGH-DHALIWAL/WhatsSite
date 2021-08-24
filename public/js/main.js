const socket=io();

const chatForm=document.getElementById("chat-form");
const chatMessages=document.querySelector('.chat-messages');

// on receiving message
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
}); 

console.log({username,room});

// Always join room when javascript file loaded connection is autoatically called

socket.emit('joinRoom',username,room);

socket.on('message',(message)=>{
    console.log(message);
    outputMessage(message);

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
    div.innerHTML=`	<p class="meta">${msg.user} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.message}
    </p>`
    document.querySelector('.chat-messages').append(div);
}