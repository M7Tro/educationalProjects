import { useSocketContext } from "../hooks/useSocketContext";
import {useSelectedConversation} from "../context/useSelectedConversation";
import {useEffect} from 'react';
import notificationSound from "../assets/sounds/notification.mp3";

export const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useSelectedConversation(); //this is used in the Message component 

    useEffect(()=>{
        socket?.on("newMessage", () => {
            console.log("new message socket listener works");
            //newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            //console.log("New message received by the client using socket connection:", newMessage);
            sound.play();
            //setMessages([...messages, newMessage]);
        })

        return () => socket?.off("newMessage")
    }, [socket, messages, setMessages])

}