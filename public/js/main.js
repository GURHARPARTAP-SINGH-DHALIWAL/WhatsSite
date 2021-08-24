const socket=io();

const chatForm=document.getElementById("chat-form");
const chatMessages=document.querySelector('.chat-messages');

// on receiving message

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
    div.innerHTML=`	<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${msg}
    </p>`
    document.querySelector('.chat-messages').append(div);
}