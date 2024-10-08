import {createContext, useState, useEffect} from 'react';
import { useAuthUser } from './authUser';
import {io} from 'socket.io-client';

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthUser();

    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:3000", {
                query: {
                    userId: authUser._id,

                }
            });
            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                console.log("Someone logged in")
                setOnlineUsers(users);
            })
            return () => socket.close();
        } else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}