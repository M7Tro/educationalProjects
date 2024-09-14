import Message from "./Message";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useSelectedConversation } from "../../context/useSelectedConversation";
import {useRef, useEffect} from 'react';

export default function Messages () {
    const {loading, messages} = useGetMessages();
    const {selectedConversation} = useSelectedConversation();
    const lastMessageRef = useRef(null);
    
    useEffect(()=>{
        setTimeout(()=>{
            if(lastMessageRef.current){
                lastMessageRef.current.scrollIntoView({behavior: "smooth"});
            }
        }, 100)
    }, [selectedConversation])


    return (
        <div className="flex flex-col items-center overflow-auto h-[480px]">
            {!loading ? (messages && messages.map((message, index) => (
                <div className="w-full" key = {index} ref={lastMessageRef}>
                    <Message message={message.message} createdAt={message.createdAt} senderId={message.senderId}/>
                </div>
            ))) : (<span className="loading loading-spinner loading-md"></span>)
            }
            {(messages.length === 0 && !loading) && <div className="w-full h-full flex items-center justify-center 
            text-3xl text-white ">
                    No messages yet
                </div>}
        </div>
    ) 
}