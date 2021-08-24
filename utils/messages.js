const moment=require('moment');

module.exports.formatMessage=function(user,message)
{
    return {
        user,
        message,
        //  read doculmentation
        time:moment().format('h:mm a')
    };
}