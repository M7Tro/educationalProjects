export default function Login () {
    return (
        <div className="w-1/2 h-1/2">
            <div className="h-full w-full bg-gray-700 
            rounded-md bg-clip-padding backdrop-filter 
            backdrop-blur-sm bg-opacity-20 border border-gray-100">
                <form className="flex flex-col justify-evenly items-center p-4 h-full">
                    <h1 className="text-4xl mb-3">ChatApp <span className="font-bold text-blue-400">Log In</span></h1>
                    <label className="text-2xl w-4/5 text-left font-semibold">Username</label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-3/4" />
                    <label className="text-2xl w-4/5 text-left font-semibold">Password</label>
                    <input type="password " placeholder="Type here" className="input input-bordered w-3/4" />
                    <a href="#" className="text-xl hover:underline">
                        Not registered yet?
                    </a>
                    <button className="btn text-3xl btn-outline m-3">Login</button>
                </form>
            </div>
        </div>
    )
}