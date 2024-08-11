import { WorkoutContext } from "../context/WorkoutContext";
import {useContext} from 'react';


export const useWorkoutContext = () => {

    const context = useContext(WorkoutContext);
    if(!context){
        throw Error("Can't user the workoutContext out of bounds");
    }
    return context; 
}