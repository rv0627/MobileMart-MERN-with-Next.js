const express = require('express');
const app = express();
const cors = require('cors');
const userController = require('./userController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/createuser',(req,res,next)=>{
    userController.createUser(req.body,(callback)=>{
        res.send();
    })
});

module.exports = app;