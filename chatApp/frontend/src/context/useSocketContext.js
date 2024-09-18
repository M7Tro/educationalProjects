import { SocketContext } from "./SocketContext";
import {useContext} from 'react';

export const useSocketContext = () => {
    return useContext(SocketContext);
}