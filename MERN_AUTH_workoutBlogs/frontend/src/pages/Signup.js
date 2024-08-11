import {useState} from 'react';
import {useSignup} from '../hooks/useSignup.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signup, isPending, error} = useSignup();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        //console.log("Credentials: ", email, password);
        await signup(email, password);
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
            <button disabled={isPending} onClick={handleSubmit}>Sign Up</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default Login;