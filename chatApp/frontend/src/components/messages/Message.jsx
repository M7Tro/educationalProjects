import { useAuthUser } from "../../context/authUser";
import { extractTime } from "../../utils/extractTime";

export default function Message ({message, senderId, createdAt}) {
    const {authUser} = useAuthUser();

    //console.log("Auth user:", authUser._id, "senderId:", senderId);
    return (
        <div className={`chat px-6 ${(senderId === authUser._id) ? "chat-end" : "chat-start"} w-full mr-10`}>
            <div className="chat-image avatar h-fit">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            
            <div className={`chat-bubble ${(senderId === authUser._id) ? "chat-bubble-info" : ""}`}>{message}</div>

            <div className="chat-footer">
                <time className="text-xs opacity-50">{extractTime(createdAt)}</time>
            </div>
        </div>
    )
}    


/**
 * 
 */