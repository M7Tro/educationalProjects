import Conversation from "./Conversation";
import { useGetConversations } from "../../context/useGetConversations";
import {randomEmoji} from '../../utils/emoji.js';

export default function Conversations () {
    const {loading, conversations} = useGetConversations();

    return (
        <div className="flex flex-col py-2 overflow-auto ml-2">
            {!loading && conversations.map((conversation, index) => (
                <Conversation key={conversation._id} conversation={conversation} currIdx={index} emoji={randomEmoji()} lastIdx={conversations.length-1}/>
            ))}
        </div>
    )
}