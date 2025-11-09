const express = require('express');
const app = express();
const cors = require('cors');
const userController = require('./userController');
const jwt = require('jsonwebtoken');
const productController = require('./controller/productController');
const paymentController = require('./controller/paymentController');
const checkoutRoutes = require('./routes/checkout');


app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(passport.initialize());
require('./config/passport')(passport);

// Serve static files
const path = require('path');
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/checkout', checkoutRoutes);

// Enable pre-flight requests for all routes
app.options('*', cors());

// User registration
app.post('/createuser',(req,res,next)=>{
    userController.createUser(req.body,(callback)=>{
        res.send();
    })
});

// User login
app.post('/userLogin',(req,res,next)=>{
    userController.userLogin(req.body,(callback)=>{
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

//product add 
app.post('/addProduct',(req,res,next)=>{
    productController.addProduct(req.body,(callback)=>{
        res.send();
    });
});

app.get('/products',(req,res,next)=>{
    productController.getAllProducts(req.body,(callback)=>{
        res.send();
    });
});

app.get('/products/:id',(req,res,next)=>{
    productController.getProductById(req.body,(callback)=>{
        res.send();
    });
});

app.post('/create-session',(req,res,next)=>{
    paymentController.createPaymentIntent(req.body,(callback)=>{
        res.send();
    });
});

module.exports = app;