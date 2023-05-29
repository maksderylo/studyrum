import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from './images/logotranssmall.png';
import Likes from './utils/Likes.js'
import Comments from './utils/Comments.js'

const Home = () => {
    const [thread, setThread] = useState({
        title: '',
        description: ''
    });
    const [threadList, setThreadList] = useState([]);
    const navigate =useNavigate();
    const username = localStorage.getItem("_name");

    useEffect(() => {
        fetch("http://localhost:8081/api/all/threads")
        .then((res) => res.json())
        .then((data) => {
            setThreadList(data.threads);   
        })
        .catch((err) => console.error(err));

    }, [navigate]);

    const createThread = () => {
        fetch("http://localhost:8081/api/create/thread", {
            method: "POST",
            body: JSON.stringify({
                thread,
                userId: localStorage.getItem("_id"),
                originator: username
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                setThreadList(data.threads);
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
        setThread({
            title:'',
            description:''
        })
        }
        
    };
    
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

    

    const handleInput = (e) => {
        setThread(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }
    

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
                <div className="space"></div>
                <div className="Content">
                <form className='homeForm' onSubmit={handleSubmit}>
                <h2 className='homeTitle'>Create a Thread</h2>
                    <div className='home__container'>
                        <label htmlFor='thread'>Title</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            value={thread.title}
                            required
                            onChange={handleInput}
                        />
                        <label htmlFor='thread'>Description</label>
                        <input
                            type='text'
                            name='description'
                            id='description'
                            value={thread.description}
                            required
                            onChange={handleInput}
                        />
                    </div>
                    <button className='homeBtn'>CREATE THREAD</button>
                </form>
                <div className="space"></div>
                <div className='threadCont'>
                {threadList.map((thread) => (
                    <div className='threadItem' key={thread.id}>
                        <div className="threadText">
                        <h1>{thread.title}</h1>
                        <p>{thread.description}</p></div>
                        <div className='reactCont'>
                            <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                            <Comments
                                numberOfComments={thread.replies.length}
                                threadId={thread.id}
                                title={thread.title}
                            />
                        </div>
                        <div className="underline"></div>
                    </div>
                ))}
            </div>
            </div>
            </main>
        </>
    );
};

export default Home;