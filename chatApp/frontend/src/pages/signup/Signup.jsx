import GenderBox from "./GenderBox"

export default function Signup () {
    return (
        <div className="w-1/2 h-fit">
            <div className="h-fit w-full bg-gray-700 
            rounded-md bg-clip-padding backdrop-filter 
            backdrop-blur-sm bg-opacity-20 border border-gray-100">
                <form className="flex flex-col justify-evenly items-center p-4 h-full">
                    <h1 className="text-4xl mb-3">ChatApp <span className="font-bold text-blue-400">Sign Up</span></h1>
                    
                    <label className="text-2xl w-4/5 text-left font-semibold my-4" >Full Name</label>
                    <input type="text" className="input input-bordered w-3/4" />

                    <label className="text-2xl w-4/5 text-left font-semibold my-4">Username</label>
                    <input type="password" className="input input-bordered w-3/4" />

                    <label className="text-2xl w-4/5 text-left font-semibold my-4">Password</label>
                    <input type="password" className="input input-bordered w-3/4" />

                    <label className="text-2xl w-4/5 text-left font-semibold my-4">Confirmed Password</label>
                    <input type="password" className="input input-bordered w-3/4" />
                    <a href="#" className="text-xl hover:underline my-4">
                        Already have an account?
                    </a>
                    {/*Gender checkbox */}
                    <GenderBox/>

                    <button className="btn text-3xl btn-outline m-3">Sign Up</button>
                </form>
            </div>
        </div>
    )
}