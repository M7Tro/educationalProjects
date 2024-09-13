import { useSelectedConversation } from "../../context/useSelectedConversation";

export default function Conversation ({conversation, currIdx, lastIdx, emoji}) {
    const {selectedConversation, setSelectedConversation} = useSelectedConversation();

    let isSelected = selectedConversation?._id === conversation._id;
    const handleSelection = () => {
        setSelectedConversation(conversation);
    }

    return (
        <>
            <div className={`flex items-center gap-2 
                rounded p-2 py-1 
                hover:-translate-x-1 duration-300
                cursor-pointer ${isSelected ? "bg-blue-900" : ""}`}
                onClick={handleSelection}
            >

                <div className="avatar online border-4 rounded-full">
                    <div className="w-12 rounded-full">
                        <img src={conversation.profilePic} alt="user avatar" />
                    </div>
                </div>

                <div className="w-full flex items-center gap-3 justify-between font-semibold text-xl text-white">
                    <p>{conversation.fullname}</p>
                    <span className="text-xl">{emoji}</span>
                </div>

            </div>
            <div className={`divider divider-info m-0 p-0 h-3 
                ${(currIdx===lastIdx) ? "hidden" : "" }`}/>
        </>
    )
}