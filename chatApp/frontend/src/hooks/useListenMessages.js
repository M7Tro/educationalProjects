import { useSocketContext } from "../context/useSocketContext";
import {useSelectedConversation} from "../context/useSelectedConversation";
import {useEffect} from 'react';
import notificationSound from "../assets/sounds/notification.mp3";

export const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useSelectedConversation(); //this is used in the Message component 

    useEffect(()=>{
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        })

        return () => socket?.off("newMessage")
    }, [socket, messages, setMessages])

}