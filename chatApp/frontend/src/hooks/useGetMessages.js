import { useState, useEffect } from "react";
import { useSelectedConversation } from "../context/useSelectedConversation";
import toast from 'react-hot-toast';

export const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useSelectedConversation();

    useEffect(()=>{
        const getMessages = async () => {
            try{
                setLoading(true);  
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const json = await res.json();
                
                if(!res.ok){
                    throw new Error(json.error);
                }else if (json.empty){
                    setMessages([]);
                } 
                else{
                    console.log("Json:", json);
                    setMessages(json);
                }
            }catch(err){
                toast.error(err.message);
            }finally{
                setLoading(false);
            }
        }

        if(selectedConversation) getMessages();
    },[selectedConversation, setMessages])

    return {loading, messages}
}