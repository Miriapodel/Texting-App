import React from "react";
import { io } from "socket.io-client";

const socketURL = process.env.REACT_APP_SOCKET_URL;

const SocketContext = React.createContext("");
const connection = io(socketURL);

export function SocketIOContextProvider({children}){
    return(
        <SocketContext.Provider value={connection}>
            {children}
        </SocketContext.Provider>
    );
}


export const useSocketIO = () => React.useContext(SocketContext);
