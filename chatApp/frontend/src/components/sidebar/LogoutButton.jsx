import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../../hooks/useLogout";

export default function LogoutButton (){
    const {loading, logout} = useLogout();
    const handleLogout = async () => {
        await logout();
    }
   return (
    <div className="mt-4">
        {(!loading) ?( <div onClick={handleLogout} className=" w-fit mb-2 ml-2 text-white cursor-pointer">
            <BiLogOut className="w-14 h-14 hover:text-blue-400 duration-300"/>
        </div>) : (<span className="loading loading-spinner loading-lg"></span>)}        
    </div>

    )
}