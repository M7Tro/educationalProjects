import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

export default function Sidebar () {
    return (
        <div className="display flex-col border-r-2 h-full pr-4 border-gray-200  border-opacity-30">
            <SearchInput/>
            <Conversations/>
            <LogoutButton/>
        </div>
    )
}