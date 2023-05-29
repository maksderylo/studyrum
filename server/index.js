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
app.listen(8081, ()=> {    
    console.log("listening");
})
