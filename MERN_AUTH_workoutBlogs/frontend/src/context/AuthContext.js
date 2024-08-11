import {createContext, useReducer, useEffect} from 'react';

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                userState: action.payload
            }
        case "LOGOUT":
            return {
                userState: null
            }
        default:
            return state 
    }
}

export const AuthContextProvider = ({children}) => {
    useEffect(()=>{
        dispatch({type: "LOGIN", payload: JSON.parse(localStorage.getItem('userState'))})
    },[])

    const [state, dispatch] = useReducer(authReducer, {
        userState: null
    })
    return <AuthContext.Provider value={{...state, dispatch}}>{children}</AuthContext.Provider>
}