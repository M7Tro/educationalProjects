import Message from "./Message";
import { useGetMessages } from "../../hooks/useGetMessages";

export default function Messages () {
    const {loading, messages} = useGetMessages();
    return (
        <div className="flex flex-col items-center overflow-auto h-[480px]">
            {!loading ? (messages && messages.map((message, index) => (
                <Message key = {index} message={message.message} createdAt={message.createdAt} senderId={message.senderId}/>
            ))) : (<span className="loading loading-spinner loading-md"></span>)
            }
            {(messages.length === 0 && !loading) && <div className="w-full h-full flex items-center justify-center 
            text-3xl text-white ">
                    No messages yet
                </div>}
        </div>
    ) 
}