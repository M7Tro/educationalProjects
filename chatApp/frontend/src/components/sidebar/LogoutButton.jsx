import { BiLogOut } from "react-icons/bi";

export default function LogoutButton (){
   return (
        <div className="mt-auto mb-2 ml-2 text-white cursor-pointer">
            <BiLogOut className="w-14 h-14 hover:text-blue-400 duration-300"/>
        </div>
    )
}