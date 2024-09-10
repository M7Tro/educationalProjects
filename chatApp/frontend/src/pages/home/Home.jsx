import Sidebar from "../../components/sidebar/Sidebar"
import MessageContainer from "../../components/messages/MessageContainer"

export default function Home () {
    return (
        <div className="flex sm:h-[450px] md:h-[550px] bg-gray-400 bg-clip-padding bg-opacity-20 rounded-lg p-4">
            <Sidebar/>
            <MessageContainer/>
        </div>
    )
}