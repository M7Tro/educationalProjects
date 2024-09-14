import Conversation from "./Conversation";
import { useGetConversations } from "../../context/useGetConversations";
import {randomEmoji} from '../../utils/emoji.js';
import { useSearchInput } from "../../context/useSearchInput.js";

export default function Conversations () {
    const {loading, conversations} = useGetConversations();
    const {searchInput} = useSearchInput();

    return (
        <div className="flex flex-col py-2 overflow-auto ml-2 h-3/4">
            {!loading && conversations.filter(conversation => conversation.fullname.toLowerCase().includes(searchInput))
            .map((conversation, index) => (
                <Conversation key={conversation._id} conversation={conversation} currIdx={index} emoji={randomEmoji()} lastIdx={conversations.length-1}/>
            ))}
        </div>
    )
}