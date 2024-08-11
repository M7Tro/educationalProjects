import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails.js';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useLogout } from '../hooks/useLogout.js';

const Home = () => {
    const {workouts, dispatch} = useWorkoutContext();
    const {userState} = useAuthContext();
    const {logout} = useLogout();

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch('/api/workouts/', {
                headers: {"Authorization": `Bearer ${userState.token}`}
            })
            const json = await response.json();
            if(response.ok){
                dispatch({type: "SET_WORKOUTS", payload: json});
            }
            
        }
        try{
            fetchData();
        }catch(err){
            console.log("Could not perform preliminary fetch");
        }
    },[dispatch, userState, logout])

    return (
        <div className="Home">
            <div className="workoutDetailsPreview">
                {workouts && workouts.map(workout => {
                    return (
                        <WorkoutDetails key={workout._id} workout={workout}></WorkoutDetails>
                    )
                })}
            </div>
            <WorkoutForm></WorkoutForm> 
        </div>
    )
}

export default Home 