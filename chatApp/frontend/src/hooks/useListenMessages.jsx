//Hook for listening to the "newMessage" event on the socket connection 
import {useSocketContext} from './useSocketContext';
import { useSelectedConversation } from '../context/useSelectedConversation';
import {useEffect} from 'react';

export const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useSelectedConversation();

    useEffect( () => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        })
        
        return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])
}