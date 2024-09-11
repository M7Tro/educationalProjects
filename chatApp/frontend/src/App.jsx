import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import {Routes, Route} from 'react-router-dom';

export default function App () {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </div>
  )
}