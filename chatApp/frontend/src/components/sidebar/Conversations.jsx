import Conversation from "./Conversation"

export default function Conversations () {
    return (
        <div className="flex flex-col py-2 overflow-auto ml-2">
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
        </div>
    )
}