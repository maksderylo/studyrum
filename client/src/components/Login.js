import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from 'axios';
import logo from './images/logotranssmall.png';
import bcrypt from 'bcryptjs';



export const Login = () => {
    const [wrongpass,setWrong] =useState({
        fail:''
    })
    const [values,setValues] =useState({
        email: '',
        password: ''
    })
    const navigate =useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }
    
    const gohome = () => {
        navigate('/dashboard');
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = Validation(values);
        setErrors(newErrors);

        if(newErrors.password === "" && newErrors.email === ""){
            try {
            const hashedPassword = await bcrypt.hash(values.password.toString(), '$2a$10$CwTycUXWue0Thq9StjUM0u');
            values.password = hashedPassword;
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                    errors.password=res.data.errorMessage;
                    if(res.data.errorMessage ==='Success'){
                        localStorage.setItem("_id",res.data.id);
                        localStorage.setItem("_name",res.data.name);
                        navigate('/dashboard');
                    }
                    else{
                        console.log(res.data.errorMessage);
                    }
            })
            .catch(err => console.log(err));
            }   catch (error) {
            console.log(error);
          }

        }
        
    };

    return (
        <main className='login'>
            <nav>
            <img src={logo} className="logo" onClick={gohome}></img>
            </nav>
            <div className="space"></div>
            <div className='loginf'>
            <h1 className='loginTitle'>Log into your account</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
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
                {errors.password && <span>Wrong email or password!</span>}
                <br></br>
                <div className="break"></div>
                <button className='loginBtn'>LOG IN</button>
                <p>
                    Don't have an account? <Link to='/register'>Create one</Link>
                </p>
                
            </form>
            </div>
        </main>
    );
};
export default Login;