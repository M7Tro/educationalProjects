import {formatDistanceToNow} from 'date-fns';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutContext();
    const {userState} = useAuthContext();
    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${userState.token}`}
        })
        const json = await response.json();
        if(response.ok){
            dispatch({type: "DELETE_WORKOUT", payload: json})
        }
    }
    return (
        <div className="workoutDetails">
            <h2>{workout.title}</h2>
            <h3>{workout.reps}</h3>
            <h3>{workout.load}</h3>
            <h3>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</h3>
            <div onClick={handleDelete} className="material-symbols-outlined">delete</div>
        </div>
    )
}

export default WorkoutDetails;