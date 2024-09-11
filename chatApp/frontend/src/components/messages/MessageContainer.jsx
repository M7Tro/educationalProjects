import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";

export default function MessageContainer () {
    let noChatSelected = true;
    return (
        <div className="md:min-w-[500px] relative">
            { !noChatSelected && <>
                {/**Header: */}
                <div className="w-full bg-gray-500 p-3 mb-3 text-xl semibold text-white rounded-tr-lg">To: <span className="text-black">Someone</span></div>
                {/**Container for messages: */}
                <Messages/>
                {/**Input for messages: */} 
                <MessageInput/>            
            </>}
            {noChatSelected && <NoChatSelected/>}
        </div>
    )
}

function NoChatSelected () {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center text-white text-2xl font-semibold">
            <h1>Welcome 👋 Mr. Vicious</h1>
            <h1>Select a chat to star messaging</h1>
            <TiMessages className="w-20 h-20"/>
        </div>
    )
}