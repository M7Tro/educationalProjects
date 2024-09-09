import Sidebar from "../../components/sidebar/Sidebar"

export default function Home () {
    return (
        <div className="flex sm:h-[450px] md:h-[550px] bg-gray-400 bg-clip-padding bg-opacity-20 rounded-lg p-4">
            <Sidebar/>
        </div>
    )
}