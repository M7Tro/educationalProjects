import { Link } from "react-router-dom";
import {useState} from 'react';
import { useLogin } from "../../hooks/useLogin";

export default function Login () {
    const [input, setInput] = useState({
        username: "",
        password: ""
    })
    const {loading, login} = useLogin();
    const handleLogin = async (e) => {
        e.preventDefault();
        await login(input);
    }

    return (
        <div className="w-1/2 h-1/2">
            <div className="h-full w-full bg-gray-700 
            rounded-md bg-clip-padding backdrop-filter 
            backdrop-blur-sm bg-opacity-20 border border-gray-100">
                <form onSubmit={handleLogin} className="flex flex-col justify-evenly items-center p-4 h-full text-white">
                    <h1 className="text-4xl mb-3">ChatApp <span className="font-bold text-blue-400">Log In</span></h1>
                    <label className="text-2xl w-4/5 text-left font-semibold">Username</label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-3/4" 
                        value={input.username} onChange={(e)=>{setInput({...input, username:e.target.value})}}
                    />
                    <label className="text-2xl w-4/5 text-left font-semibold">Password</label>
                    <input type="password" placeholder="Type here" className="input input-bordered w-3/4" 
                        value={input.password} onChange={(e)=>{setInput({...input, password: e.target.value})}}
                    />
                    <Link to='/signup' className="text-xl hover:underline">
                        Not registered yet?
                    </Link>
                    <button disabled={loading} className="btn text-3xl btn-outline m-3 text-white">Login</button>
                </form>
            </div>
        </div>
    )
} 