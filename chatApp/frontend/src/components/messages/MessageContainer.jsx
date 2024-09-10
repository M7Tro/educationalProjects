import Messages from "./Messages"

export default function MessageContainer () {
    return (
        <div className="md:min-w-[550px]">
            {/**Header: */}
            <div className="">Header</div>
            {/**Container for messages: */}
            <Messages/>
            {/**Input for messages: */} 
        </div>
    )
}