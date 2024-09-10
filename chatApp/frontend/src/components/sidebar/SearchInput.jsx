import { FaSearch } from "react-icons/fa";

export default function SearchInput () {
    return (
        <form className="flex align-center gap-4 mt-2 ml-2">
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <button className="btn btn-xs sm:btn-sm md:btn-md">
                <FaSearch className="text-blue-500"/>
            </button>
        </form>
    )
}