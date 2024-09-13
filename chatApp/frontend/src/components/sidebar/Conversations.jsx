import Conversation from "./Conversation";
import { useGetConversations } from "../../hooks/useGetConversations";

export default function Conversations () {
    const {loading, conversations} = useGetConversations();

    return (
        <div className="flex flex-col py-2 overflow-auto ml-2">
            {conversations.map(conversation => (
                <Conversation key={conversation._id}/>
            ))}
        </div>
    )
}