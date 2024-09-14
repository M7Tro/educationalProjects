import { useSearchInput } from '../../context/useSearchInput';

export default function SearchInput () {
    const {searchInput, setSearchInput} = useSearchInput();
    const handleSearch = (e) => {
        e.preventDefault();
    }

    return (
        <div className='h-1/10'>
            <form onSubmit={handleSearch} className="flex align-center gap-4 mt-2 ml-2">
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
                    value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }}
                />
            </form>      
            <div className="w-full py-1 border-b-2 border-b-gray-200 border-opacity-30"></div>  
        </div>

    )
}