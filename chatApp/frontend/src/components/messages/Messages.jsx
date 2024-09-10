import Message from "./Message"

export default function Messages () {
    return (
        <div className="flex flex-col items-center overflow-auto h-[480px]">
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
        </div>
    )
}