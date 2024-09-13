import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { useSelectedConversation } from "../../context/useSelectedConversation";
import { useEffect } from "react";

export default function MessageContainer () {
    const {selectedConversation, setSelectedConversation} = useSelectedConversation();

    useEffect(()=>{
        return () => setSelectedConversation(null);
    },[setSelectedConversation])
    return (
        <div className="md:min-w-[500px] relative">
            { selectedConversation && <>
                {/**Header: */}
                <div className="w-full bg-gray-500 p-3 mb-3 text-2xl font-semibold text-white rounded-tr-lg">To: <span className="text-black">{selectedConversation.fullname}</span></div>
                {/**Container for messages: */}
                <Messages/>
                {/**Input for messages: */} 
                <MessageInput/>            
            </>}
            {!selectedConversation && <NoChatSelected/>}
        </div>
    )
}

function NoChatSelected () {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    return (
        <div className="w-full h-full flex flex-col justify-center items-center text-white text-2xl font-semibold">
            <h1>Welcome 👋 {authUser.fullname}</h1>
            <h1>Select a chat to star messaging</h1>
            <TiMessages className="w-20 h-20"/>
        </div>
    )
}