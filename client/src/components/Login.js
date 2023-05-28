import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from 'axios';
import logo from './images/logotrans.png';

export const Login = () => {

    const [values,setValues] =useState({
        email: '',
        password: ''
    })
    const navigate =useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }
    


    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(Validation(values))
        if(errors.password === "" && errors.email === ""){
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                    if(res.data.errorMessage ==='Success'){
                        localStorage.setItem("_id",res.data.id);
                        navigate('/dashboard');
                    }
                    else{
                        console.log(res.data.errorMessage);
                    }
            })
            .catch(err => console.log(err));
            
        }
        
    };

    return (
        <main className='login'>
            <nav>
            <img src={logo} className="logo"></img>
            </nav>
            <div className="space"></div>
            <div className='loginf'>
            <h1 className='loginTitle'>Log into your account</h1>
            <form className='loginForm' >
                <label htmlFor='email'>Email Address</label>
                <br></br>
                <input
                    placeholder="examplemail@gmail.com"
                    type='text'
                    name='email'
                    id='email'
                    onChange={handleInput}
                />
                <br></br>
                <div className="break"></div>
                <label htmlFor='password'>Password</label>
                <br></br>
                <input
                    placeholder="*********"
                    type='password'
                    name='password'
                    id='password'
                    onChange={handleInput}
                />
                <br></br>
                <div className="break"></div>
                <button className='loginBtn' onClick={handleSubmit}>LOG IN</button>
                <p>
                    Don't have an account? <Link to='/register'>Create one</Link>
                </p>
                
            </form>
            </div>
        </main>
    );
};
export default Login;