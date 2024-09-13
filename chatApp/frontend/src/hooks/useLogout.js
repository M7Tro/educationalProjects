import {useState} from 'react';
import {toast} from 'react-hot-toast';
import { useAuthUser } from '../context/authUser';
import { useSelectedConversation } from '../context/useSelectedConversation';
 
export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthUser();
    const {setSelectedConversation} = useSelectedConversation();

    const logout = async () => {
        try{
            setLoading(true);
            const res = await fetch('/api/auth/logout', {
                method: "POST"
            })
            const json = await res.json();
            if(json.error){
                throw new Error("Something went wrong during logout");
            }
            localStorage.removeItem("authUser");
            setAuthUser(null);
            setSelectedConversation(null);
            toast.success("Logout successful");
        }catch(err){
            toast(err.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading, logout};
}