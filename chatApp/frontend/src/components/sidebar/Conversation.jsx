export default function Conversation () {
    return (
        <>
            <div className="flex items-center gap-2 
            hover:bg-sky-600 duration-200 rounded p-2 py-1 cursor-pointer">

                <div className="avatar online border-4 rounded-full">
                    <div className="w-12 rounded-full">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Sid_Vicious_1978_%28cropped%29.jpg" alt="user avatar" />
                    </div>
                </div>

                <div className="w-full flex items-center gap-3 justify-between font-semibold text-xl text-white">
                    <p>Sid Vicious</p>
                    <span>🎸</span>
                </div>

            </div>
            <div className="divider divider-info m-0 p-0 h-3"/>
        </>
    )
}