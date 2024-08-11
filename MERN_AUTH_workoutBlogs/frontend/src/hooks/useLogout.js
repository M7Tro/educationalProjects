import {useAuthContext} from './useAuthContext.js';

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const logout = () => {
        dispatch({type: "LOGOUT"});
        localStorage.removeItem('userState');
    }
    return {logout};
}