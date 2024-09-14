import {create} from 'zustand';

export const useSearchInput = create((set) => ({
    searchInput: "",
    setSearchInput: (input) => {set({searchInput:input})}
}))