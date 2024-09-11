import {useState} from 'react';
import toast from 'react-hot-toast';

export const  useSignup = () => {
    const [loading, setLoading] = useState(false);

    const signup = async (input) => {
        try{
            setLoading(true);
            inputValid(input);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(input)
            })
            const json = await res.json();
            if(!res.ok){
                throw new Error(json.error);
            }else{
                toast.success("Registration successful");
            }
        }catch(err){
            console.log(err.message);
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading, signup};
}

const inputValid = ({fullname, username, password, confirmedPassword, gender}) => {
    if(!fullname || !username || !password || !confirmedPassword || !gender){
        throw new Error("All fields must be filled");
    }
    if(password !== confirmedPassword){
        throw new Error("Passwords do not match")
    }
    return true;
}