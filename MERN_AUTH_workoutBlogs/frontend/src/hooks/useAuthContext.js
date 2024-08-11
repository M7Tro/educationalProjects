import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw Error("Can't use the AuthContext out of bounds");
    }
    return context;
}