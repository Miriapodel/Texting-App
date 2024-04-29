import React from "react";
import { useSocketIO } from "../contexts/socketIOContext.jsx";
import { useState } from "react";
import Message from "../components/message/Message.jsx";

function createMsgObj(message, isLink){
    return {
        ...message,
        isLink: isLink,
        username: "Anonymous"
    }
}

function TestPage(){
    const [inputVal, setInputVal] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const socket = useSocketIO();

    React.useEffect(() => {

        socket.on("sendMessage", (message) => {
            const msg = createMsgObj(message, false);

            setMessages(oldMessages => [...oldMessages, msg]);
        });

        socket.on("sendLocation", (message) => {
            const msg = createMsgObj(message, true);

            setMessages(oldMessages => [...oldMessages, msg]);
        })

        return () => {
            socket.off("sendMessage");
        }

    }, [socket]);

    function handleInputChange(event){
        const newVal = event.target.value;

        setInputVal(newVal);
    }

    function handleInputClick(){
        socket.emit("sendMessage", inputVal, () => {
            console.log("Message delivered!");
        });

        setInputVal("");
    }

    function handleShareLocation(){
        if(!navigator.geolocation){
            return alert("Your browser does not support location sharing!");
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const data = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }

            socket.emit("sendLocation", data, () => {
                console.log("Location shared!");
            });
        });
    }

    return(
        <>
            {messages.map( (element, index) => {
                return <Message key={index} msg={element} />
            })}

            <br />
            <input type="text" name="input" value={inputVal} onChange={handleInputChange} />
            <button onClick={handleInputClick}>Send message</button>
            <br />

            <button onClick={handleShareLocation}>Share location</button>
        </>
    );
}

export default TestPage;