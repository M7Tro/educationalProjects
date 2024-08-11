import {useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = (email, password) => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const {dispatch} = useAuthContext();

    const signup = async (email, password) => {
        const response = await fetch('/api/workouts/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })
        const json = await response.json();
        if(!response.ok){
            setIsPending(false);
            setError(json.error);
        }
        if(response.ok){
            setIsPending(false);
            setError(null);
            localStorage.setItem('userState', JSON.stringify(json))
            dispatch({type: "LOGIN", payload: json})
            console.log("json from server: ", json);
        }
    }
    return {signup, isPending, error};
}
