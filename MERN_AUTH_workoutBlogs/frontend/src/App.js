import Home from "./pages/Home.js";
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar.js';
import { useAuthContext } from "./hooks/useAuthContext.js";

const App = () => {
  const {userState} = useAuthContext();

  return (
    
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="pages">
          <Routes>
            <Route path='/' element={userState ? <Home/> : <Navigate to='/login'/>}></Route>
            <Route path='/signup' element={!userState ? <Signup/> : <Navigate to='/'/>}></Route>
            <Route path='/login' element={!userState ? <Login/> : <Navigate to='/'/>}></Route>
          </Routes>
        </div>      
      </BrowserRouter>

    </div>
  )
}

export default App