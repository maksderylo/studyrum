const express = require("express");

const mysql = require('mysql');

const cors = require('cors');

const { check, validationResult } = require('express-validator');

const generateID = () => Math.random().toString(36).substring(2, 10);

const app = express();app.use(cors());app.use(express.json());
const db = mysql.createConnection({ 
    host: "localhost",    user: "root",    password: "",    database: "signup"
})
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name,email,password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password 
        ]    
        db.query(sql, [values], (err, data) => { 
            if(err) {
                return res.json("Error");
            }
            return res.json(data);
            })})

app.post('/login',
        [check('email', "Emaill length error").isEmail().isLength({min: 10, max:30}),
        check('password', "password length 8-10").isLength({min: 8, max: 200})],
        (req, res) => {    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
        db.query(sql,
        [req.body.email,req.body.password ],
        (err, data) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.json({
                errorMessage: "Fail",
            });
        } else {
            if(err) {
                return res.json({
                    errorMessage: "Fail",
                });
            }
        if(data.length > 0) {
            return res.json({
                errorMessage: "Success",
                id: data[0].id,
                name: data[0].name
            });           
        } else {               
            return res.json({
                errorMessage: "Fail",
            });           
            }
        }})})

const threadList = [];

app.post("/api/create/thread", async (req, res) => {
const { thread, userId } = req.body;
const threadId = generateID();
        
            //👇🏻 add post details to the array
            threadList.unshift({
                id: threadId,
                title: thread,
                userId,
                replies: [],
                likes: [],
            });
        
            //👇🏻 Returns a response containing the posts
            res.json({
                message: "Thread created successfully!",
                threads: threadList,
            });
        });

app.get("/api/all/threads", async (req, res) => {
    res.json({
        message: "Threads passed!",
        threads: threadList
    });
})

app.post("/api/thread/like", (req, res) => {
    //👇🏻 accepts the post id and the user id
    const { threadId, userId } = req.body;
    //👇🏻 gets the reacted post
    const result = threadList.filter((thread) => thread.id === threadId);
    //👇🏻 gets the likes property
    const threadLikes = result[0].likes;
    //👇🏻 authenticates the reaction
    const authenticateReaction = threadLikes.filter((user) => user === userId);
    //👇🏻 adds the users to the likes array
    if (authenticateReaction.length === 0) {
        threadLikes.push(userId);
        return res.json({
            message: "You've reacted to the post!",
        });
    }
    //👇🏻 Returns an error user has reacted to the post earlier
    res.json({
        error_message: "You can only react once!",
    });
});

app.post("/api/thread/replies", (req, res) => {
    //👇🏻 The post ID
    const { id } = req.body;
    //👇🏻 searches for the post
    const result = threadList.filter((thread) => thread.id === id);
    //👇🏻 return the title and replies
    res.json({
        replies: result[0].replies,
        title: result[0].title
    });
});

app.post("/api/create/reply", async (req, res) => {
    //👇🏻 accepts the post id, user id, and reply
    const { id, userId, reply } = req.body;

    //👇🏻 search for the exact post that was replied to
    const result = threadList.filter((thread) => thread.id === id);
    //👇🏻 search for the user via its id
    db.query('SELECT name FROM login WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error('Error fetching user name from database:', error);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            if (results.length > 0) {
              const userName = results[0].name;                
              result[0].replies.unshift({
                userId: userId,
                name: userName,
                text: reply,
            });
        
            res.json({
                message: "Response added successfully!",
            });

            } else {
              res.status(404).json({ error: 'User not found' });
            }
          }
        });

    
});

app.listen(8081, ()=> {    
    console.log("listening");
})
