import Messages from "./Messages";
import MessageInput from "./MessageInput";

export default function MessageContainer () {
    return (
        <div className="md:min-w-[500px] relative">
            {/**Header: */}
            <div className="w-full bg-gray-500 p-3 mb-3 text-xl semibold text-white rounded-tr-lg">To: <span className="text-black">Someone</span></div>
            {/**Container for messages: */}
            <Messages/>
            {/**Input for messages: */} 
            <MessageInput/>
        </div>
    )
}