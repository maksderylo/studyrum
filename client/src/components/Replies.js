import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from './images/logotranssmall.png';

const Replies = () => {
    const [replyList, setReplyList] = useState([]);
    const [reply, setReply] = useState("");
    const [title, setTitle] = useState("");
    const [originator, setOriginator] = useState("");
    const [description, setDesc] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchReplies = () => {
            fetch("http://localhost:8081/api/thread/replies", {
                method: "POST",
                body: JSON.stringify({
                    id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setReplyList(data.replies);
                    setTitle(data.title);
                    setDesc(data.description);
                    setOriginator(data.originator);
                })
                .catch((err) => console.error(err));
        };
        fetchReplies();
    }, [id]);

    //👇🏻 This function when triggered when we add a new reply
    const addReply = () => {
        fetch("http://localhost:8081/api/create/reply", {
            method: "POST",
            body: JSON.stringify({
                id,
                userId: localStorage.getItem("_id"),
                reply
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
            })
            .catch((err) => console.error(err));
    };
    
    const handleSubmitReply = (e) => {
        e.preventDefault();
        //👇🏻 calls the function
        addReply();
        setReply("");
        window.location.reload(true);
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
    const goHome = () => {
        navigate('/dashboard');
    };
    const username = localStorage.getItem("_name");

    return (
    <main className='replies'>
        <nav>
                    <img src={logo} className="logo" onClick={goHome}></img>
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
        <div className="textReplies">
        <h1 className='repliesTitle'>{title}</h1>
        <p className='repliesDesc'>{description}</p>
        <p className='repliesOri' style={{ opacity: "0.5" }}>by {originator}</p>
        </div>
        <div className="underline"></div>
        <div className="spacesmall"></div>
        <div className='thread__container'>
            {replyList.map((reply) => (
                <div className='thread__item'>
                    <p>{reply.text}</p>
                        <p className='react__container' style={{ opacity: "0.5" }}>by {reply.name}                       
                        </p>
                        <div className="underlinename"></div>
                    <div className="spacesmall"></div>
                </div>
                
            ))}
        </div>
        <div className="space"></div>
        <form className='homeForm' onSubmit={handleSubmitReply}>
            <label htmlFor='reply'>Reply to the thread!</label>
            <textarea
                rows={5}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                type='text'
                name='reply'
                className='modalInput'
            />

            <button className='modalBtn'>SEND</button>
        </form>
        </div>
    </main>
);
};


export default Replies;