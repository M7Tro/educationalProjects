import {useState} from 'react';
import {useAuthContext} from '../hooks/useAuthContext.js';
import {useWorkoutContext} from '../hooks/useWorkoutContext'


const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState(0);
    const [load, setLoad] = useState(0);

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const {userState} = useAuthContext();

    const {dispatch} = useWorkoutContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);
        const response  = await fetch('/api/workouts/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userState.token}`
            },
            body: JSON.stringify({title, reps, load})
        })
        const json = await response.json();
        if(!response.ok){
            setIsPending(false);
            setError(json.error);
        }
        if(response.ok){
            setIsPending(false);
            setError(null);
            setTitle('');
            setReps(0);
            setLoad(0);
            dispatch({type: "ADD_WORKOUT", payload: json})
        }
    }

    return (
        <form action="" className="create">
            <label htmlFor="">Exercise</label>
            <input 
                type="text" 
                onChange={(e)=>{setTitle(e.target.value)}}
                value={title}
            />
            <label htmlFor="">Reps</label>
            <input 
                type="number" 
                onChange={(e)=>{setReps(e.target.value)}}
                value={reps}
            />
            <label htmlFor="">Load</label>
            <input 
                type="number" 
                onChange={(e)=>{setLoad(e.target.value)}}
                value={load}
            />
            <button disabled={isPending} onClick={handleSubmit}>Add Workout</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default WorkoutForm 