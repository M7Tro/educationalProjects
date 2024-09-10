import { IoIosSend } from "react-icons/io";

export default function MessageInput () {
    return (
        <form className="h-fit bottom-0 absolute w-full m-3">
            <div className="flex items-center w-full justify-between">
                <input type="text" placeholder="Type message here" className="w-[400px] p-2 rounded-lg"/>
                <button className="text-3xl text-blue-600 hover:text-blue-300 mr-5">
                    <IoIosSend/>
                </button>
            </div>
        </form>
    )
}