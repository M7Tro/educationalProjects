import SearchInput from "./SearchInput";
import Conversations from "./Conversations";

export default function Sidebar () {
    return (
        <div>
            <SearchInput/>
            <div className="divider divider-info px-3 "></div>
            <Conversations/>
            {/* <LogoutButton/> */}

        </div>
    )
}