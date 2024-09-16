import {createContext, useState, useEffect} from 'react';
import { useAuthUser } from './authUser';
import {io} from 'socket.io-client';

export const SocketContext = createContext();
export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const {authUser} = useAuthUser();

    useEffect(()=>{
        //console.log("Socket context works");
        if(authUser){//if user is authenticated 
            const socket = io("http://localhost:3000");
            setSocket(socket);
            return () => {socket.close()} //cleanup function on unmount
        } else {//if user is not authenticated
            if(socket){//if there is an existing socket connection, we want to close it
                socket.close();
                setSocket(null);
            }
        }
    }, [])

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}