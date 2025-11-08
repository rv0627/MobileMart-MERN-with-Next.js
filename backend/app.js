const express = require('express');
const app = express();
const cors = require('cors');
const userController = require('./userController');
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(passport.initialize());
require('./config/passport')(passport);


app.post('/createuser',(req,res,next)=>{
    userController.createUser(req.body,(callback)=>{
        res.send();
    })
});

// Redirect user to Google
app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback
app.get('/api/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const user = req.user;
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // send token back as cookie OR json
        res.json({
            message: "Google login success",
            token,
            name: user.name,
            email: user.email,
            userId: user.userId
        });
    }
);

module.exports = app;