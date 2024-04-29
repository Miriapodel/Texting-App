import React from "react";
import { useSocketIO } from "../contexts/socketIOContext.jsx";
import { useState } from "react";

function TestPage(){
    const [inputVal, setInputVal] = React.useState("");
    const socket = useSocketIO();

    React.useEffect(() => {

        socket.on("sendMessage", (message) => {
            console.log(message);
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
        socket.emit("sendMessage", inputVal);

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

            socket.emit("sendLocation", data);
        });
    }

    return(
        <>
            <input type="text" name="input" value={inputVal} onChange={handleInputChange} />
            <button onClick={handleInputClick}>Send message</button>
            <br />

            <button onClick={handleShareLocation}>Share location</button>
        </>
    );
}

export default TestPage;