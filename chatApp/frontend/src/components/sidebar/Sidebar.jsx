import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

export default function Sidebar () {
    return (
        <div className="flex flex-col border-r-2 h-full justify-evenly pr-4 border-gray-200  border-opacity-30">
            <SearchInput />
            <div className="w-full py-1 border-b-2 border-b-gray-200 border-opacity-30"></div>
            <Conversations/>
            <LogoutButton/>
        </div>
    )
}