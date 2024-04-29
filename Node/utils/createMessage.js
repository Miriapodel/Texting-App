import moment from "moment";

function createMessage(message){
    const time = moment(new Date().getTime()).format("H:mm");

    return {
        message: message,
        sentAt: time
    }
}

export default createMessage;