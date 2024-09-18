import { useSocketContext } from "../context/useSocketContext";
import {useSelectedConversation} from "../context/useSelectedConversation";
import {useEffect} from 'react';

export const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useSelectedConversation(); //this is used in the Message component 

    useEffect(()=>{
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            setMessages([...messages, newMessage]);
        })

        return () => socket?.off("newMessage")
    }, [socket, messages, setMessages])

}