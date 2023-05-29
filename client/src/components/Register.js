import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Validation from './RegisterValidation'
import axios from 'axios'
import logo from './images/logotranssmall.png'
import bcrypt from 'bcryptjs'


const Register = () => {
    const [values,setValues] =useState({
        name: '',
        email: '',
        password: ''
        
    })
    const navigate =useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const errors = Validation(values);
        setErrors(errors);
        
        if(errors.name === "" && errors.password === "" && errors.email === ""){
            try {
                const hashedPassword = await bcrypt.hash(values.password.toString(), '$2a$10$CwTycUXWue0Thq9StjUM0u');
                values.password = hashedPassword;
                axios.post('http://localhost:8081/signup', values)
                  .then(res => {
                    navigate('/');
                  })
                  .catch(err => console.log(err));
              } catch (error) {
                console.log(error);
              }
        }
    };

    const gohome = () => {
        navigate('/dashboard');
    };
    
    return (
        <main className='register'>
            <nav>
            <img src={logo} className="logo" onClick={gohome}></img>
            </nav>
            <div className="space"></div>
            <div className='registerf'>
                
            <h1 className='registerTitle'>Create an account</h1>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                placeholder="YourUsername" 
                    type='text'
                    name='name'
                    id='name'
                    onChange={handleInput}
                />
                {errors.name && <span>{errors.name}</span>}
                <br></br>
                <div className="break"></div>
                <label htmlFor='email'>Email Address</label>
                <input
                    placeholder="examplemail@gmail.com"
                    type='text'
                    name='email'
                    id='email'
                    onChange={handleInput}
                />
                {errors.email && <span>{errors.email}</span>}
                <br></br>
                <div className="break"></div>
                <label htmlFor='password'>Password</label>
                <input
                    placeholder="*********"
                    type='password'
                    name='password'
                    id='password'
                    onChange={handleInput}
                    
                />
                {errors.password && <span>{errors.password}</span>}
                <br></br>
                <div className="break"></div>
                <button type='submit' className='registerBtn'>REGISTER</button>
                <p>
                    Have an account? <Link to='/'>Sign in</Link>
                </p>
            </form>
            </div>
        </main>
    );
};

export default Register;
