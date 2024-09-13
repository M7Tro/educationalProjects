import {useState, useEffect} from 'react';

export const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(()=>{
        const getConversations = async () => {
            try{
                setLoading(true);
                const res = await fetch('/api/users/');
                const json = await res.json();
                //console.log("json conversations received:", json);
                if(res.ok){
                    setConversations(json);
                }
            }catch(err){
                console.log("error while getting conversations:", err.message);
            }finally{
                setLoading(false);
            }
        }
        getConversations();
    }, [])
    return {loading, conversations};
} 