import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from './images/logotrans.png';

const Home = () => {
    const [thread, setThread] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        setThread("");
    };
    const navigate =useNavigate();
    const signOut = () => {
        localStorage.removeItem("_id")
        window.location.reload(true);
    };
    const gotolog = () => {
        navigate('/');
    };
    const gotosign = () => {
        navigate('/register');
    };

    return (
        <>
            <main className='home'>
                <nav>
                    <img src={logo} className="logo"></img>
                    <div className="navbuttons">
                    {localStorage.getItem("_id") !== null && 
                        <button className="signoutbtn" onClick={signOut}>
                            SIGN OUT
                        </button>
                    }
                    {localStorage.getItem("_id") === null && 
                        <button className="btn" onClick={gotolog}>
                            LOG IN
                        </button>
                    }
                    {localStorage.getItem("_id") === null && 
                        <button className="btn" onClick={gotosign}>
                            SIGN IN
                        </button>
                    }</div>
                </nav>
                <h2 className='homeTitle'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label htmlFor='thread'>Title / Description</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>
                    <button className='homeBtn'>CREATE THREAD</button>
                </form>
            </main>
        </>
    );
};

export default Home;