//Hook for listening to the "newMessage" event on the socket connection 
import {useSocketContext} from './useSocketContext';
import { useSelectedConversation } from '../context/useSelectedConversation';
import {useEffect} from 'react';
import BellSound from '../assets/sounds/notification.mp3';

export const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useSelectedConversation();

    useEffect( () => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            setMessages([...messages, newMessage]);
            const notification = new Audio(BellSound);
            notification.play();
        })
        
        return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])
}