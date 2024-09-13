import GenderBox from "./GenderBox";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function Signup () {
    const {loading, signup} = useSignup();
    const [input, setInput] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmedPassword: "",
        gender: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(input);
    }
    const onCheckGenderBox = (gender) => {
        setInput({...input, gender: gender});
    }
    return (
        <div className="w-1/2 h-fit">
            <div className="h-fit w-full bg-gray-700 
            rounded-md bg-clip-padding backdrop-filter 
            backdrop-blur-sm bg-opacity-20 border border-gray-100">
                <form className="flex flex-col justify-evenly items-center p-4 h-full text-white" onSubmit={handleSubmit}>
                    <h1 className="text-4xl mb-3">ChatApp <span className="font-bold text-blue-400">Sign Up</span></h1>
                    
                    <label className="text-2xl w-4/5 text-left font-semibold my-4" >Full Name</label>
                    <input type="text" className="bg-white input input-bordered w-3/4 text-black"
                        value={input.fullname} onChange={(e)=>{setInput({...input, fullname: e.target.value})}}
                    />

                    <label className="text-2xl w-4/5 text-left font-semibold my-4">Username</label>
                    <input type="text" className="bg-white input input-bordered w-3/4 text-black" 
                        value={input.username} onChange={(e)=>{setInput({...input, username: e.target.value})}}
                    />

                    <label className="text-2xl w-4/5 text-left font-semibold my-4">Password</label>
                    <input type="password" className="bg-white input input-bordered w-3/4 text-black" 
                        value={input.password} onChange={(e)=>{setInput({...input, password: e.target.value})}}
                    />

                    <label className="text-2xl w-4/5 text-left font-semibold my-4">Confirmed Password</label>
                    <input type="password" className="bg-white input input-bordered w-3/4 text-black" 
                        value={input.confirmedPassword} onChange={(e)=>{setInput({...input, confirmedPassword: e.target.value})}}
                    />
                    {/*Gender checkbox */}
                    <GenderBox onCheck={onCheckGenderBox} selected={input.gender}/>
                    <Link to='/login' className="text-xl hover:underline my-4">
                        Already have an account?
                    </Link>
                    <button disabled={loading} className="btn text-3xl text-white btn-outline m-3">Sign Up</button>
                </form>
            </div>
        </div>
    )
}