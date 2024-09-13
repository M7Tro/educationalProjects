//Hook for sending messages inside the MessageInput component 

import {useState} from 'react';
import toast from 'react-hot-toast';
import { useSelectedConversation } from '../context/useSelectedConversation';

export const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const {setMessages} = useSelectedConversation();

    //Function returned by the hook to send messages on click:
    const sendMessage = async (message, receiverId) => {
        try{
            setLoading(true);
            const res = await fetch(`/api/messages/send/${receiverId}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message})
            })
            const json = await res.json();
            if(!res.ok){
                throw new Error(json.error);
            }else {
                toast.success("Message sent!");
                console.log("Json received:",json);
                setMessages(json.messages);
            }
        }catch(err){
            toast.error(err.message);

        }finally{
            setLoading(false);
        }
    }
    return {loading, sendMessage};
}