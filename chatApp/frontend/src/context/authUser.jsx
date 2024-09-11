import {create} from 'zustand';

export const useAuthUser = create((set)=>({
    authUser: JSON.parse(localStorage.getItem("authUser") || null),
    setAuthUser: (data) => {set({authUser: data})}
}))