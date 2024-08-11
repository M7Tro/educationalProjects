import {useState} from 'react';
import {useLogin} from '../hooks/useLogin.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login, isPending, error} = useLogin();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await login(email, password);
    }

    return (
        <form action="" className="create">
            <label htmlFor="">Email</label>
            <input 
                type="text"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <label htmlFor="">Password</label>
            <input 
                type="password" 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            <button disabled={isPending} onClick={handleSubmit}>Log In</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default Login;