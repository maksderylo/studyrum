import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from './images/logotranssmall.png';



const Home = () => {
    const [thread, setThread] = useState("");

    const createThread = () => {
        fetch("http://localhost:8081/api/create/thread", {
            method: "POST",
            body: JSON.stringify({
                thread,
                userId: localStorage.getItem("_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.error(err));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(localStorage.getItem("_id")===null){
            navigate('/')
        }
        else{
        createThread();
        setThread("");
        }
    };
    const navigate =useNavigate();
    const signOut = () => {
        localStorage.removeItem("_id");
        localStorage.removeItem("_name")
        window.location.reload(true);
    };
    const gotolog = () => {
        navigate('/');
    };
    const gotosign = () => {
        navigate('/register');
    };

    const username = localStorage.getItem("_name");

    return (
        <>
            <main className='home'>
                <nav>
                    <img src={logo} className="logo"></img>
                    <div className="navbuttons">
                    {localStorage.getItem("_id") !== null && 
                        <button className="btn" onClick={signOut}>
                            SIGN OUT
                        </button>
                        
                    }
                    {username && <h1>{username}</h1>}
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