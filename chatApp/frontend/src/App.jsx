import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import {Routes, Route, Navigate} from 'react-router-dom';
import { useAuthUser } from './context/authUser';

export default function App () {
  const {authUser} = useAuthUser();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
    <Routes>
      <Route path='/' element={(authUser) ? <Home/> : <Navigate to='/login'/>}/>
      <Route path='/signup' element={(authUser) ? <Navigate to='/'/> : <Signup/>}/>
      <Route path='/login' element={(authUser) ? <Navigate to='/'/> : <Login/>}/>
    </Routes>
    </div>
  )
}