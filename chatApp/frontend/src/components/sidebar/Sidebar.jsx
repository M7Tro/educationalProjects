import SearchInput from "./SearchInput";
import Conversations from "./Conversations";

export default function Sidebar () {
    return (
        <div>
            <SearchInput/>
            <div className="divider divider-neutral w-full"></div>
            <Conversations/>
            {/* <LogoutButton/> */}

        </div>
    )
}