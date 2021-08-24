//  so all the users in this array along with theur name and room and id so we have to find room of a user by socketID while chat message and the fact is a user can join only one room


const users=[];
function addUser(id,name,room)
{
    const user={
        id,
        name,
        room
    };
    console.log(user);
    users.push(user);
    return user;
}

function findUserById(id)
{    
    console.log(users); 
    console.log(id);
    const user=users.find((user)=>id===user.id);
    return user;
}
module.exports={addUser,findUserById};