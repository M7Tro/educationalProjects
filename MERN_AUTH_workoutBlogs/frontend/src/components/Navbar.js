import {Link} from 'react-router-dom';
import {useAuthContext} from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
    const {userState} = useAuthContext();
    const {logout} = useLogout();

    return (
        <header className="navbar">
            {!userState && 
                <>
                    <Link to='/signup'>Sign Up</Link>
                    <Link to='/login'>Log In</Link>
                </>}
            {userState && 
                <> 
                    <p>{userState.user.email}</p>
                    <Link to='/login' onClick={logout}>Log Out</Link>
                </>
            }
        </header>
    )
}

export default Navbar;