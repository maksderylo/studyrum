import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [thread, setThread] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        setThread("");
    };
    const navigate =useNavigate();
    const signOut = () => {
        alert("USER SIGNED OUT");
        localStorage.removeItem("_id");
    };

    return (
        <>
            <main className='home'>
                <nav>
                    <img src="zdjlogo.img" className="logo"></img>
                    {localStorage.getItem("_id") != "" && 
                        <button className="signoutbtn" onClick={signOut}>
                            SIGN OUT
                        </button>
                    }
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