import { IoIosSend } from "react-icons/io";
import { useSendMessage } from "../../hooks/useSendMessage";
import {useState} from 'react';
import {useSelectedConversation} from '../../context/useSelectedConversation.js';

export default function MessageInput () {
    const {loading, sendMessage} = useSendMessage();
    const [message, setMessage] = useState("");
    const {selectedConversation} = useSelectedConversation();
    const handleSend = async (e) => {
        e.preventDefault();
        if(!message) return;
        await sendMessage(message, selectedConversation._id);
        setMessage("");
    }
    return (
        <form className="h-fit bottom-0 absolute w-full m-3">
            <div className="flex items-center w-full justify-between">
                <input type="text" placeholder="Type message here" className="w-[400px] p-2 rounded-lg"
                    value={message} onChange={(e)=>{setMessage(e.target.value)}}
                />
                {!loading ? <button disabled={loading} onClick={handleSend} className="text-3xl text-blue-600 hover:text-blue-300 mr-5">
                    <IoIosSend/>
                </button> : <div className="loading loading-spinner loading-md mr-5"></div>
            }
            </div>
        </form>
    )
}