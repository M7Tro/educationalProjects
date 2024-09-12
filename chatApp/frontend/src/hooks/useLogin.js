import { useState } from "react";
import toast from 'react-hot-toast';
import {useAuthUser} from '../context/authUser.jsx';

export function useLogin () {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthUser();

    const login = async ({username, password}) => {
        try{
            if(!login || !password){
                throw new Error("Please provide all the fields");
            }
            console.log("Receied inside useLogin:", username, password)
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            })
            const json = await res.json();

            if(!res.ok){
                throw new Error (json.error);
            }else{
                //Update the global state:
                setAuthUser(json);
                //Update the local storage: 
                localStorage.setItem("authUser", JSON.stringify(json));

                toast.success(`Login successful: ${username}`);
            }
            setLoading(true);
        }catch(err){
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading, login};
}