import Sidebar from "../../components/sidebar/Sidebar"
import MessageContainer from "../../components/messages/MessageContainer"

export default function Home () {
    return (
        <div className="flex sm:h-[450px] md:h-[620px] bg-gray-400 bg-clip-padding bg-opacity-20 rounded-lg">
            <Sidebar/>
            <MessageContainer/>
        </div>
    )
}