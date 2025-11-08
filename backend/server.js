const express = require('express');
const app = express();
const cors = require('cors');

const port = 3001;
const host = '127.0.0.1'
const mongoose = require('mongoose');
const router = require('./router');
const authRoutes = require("./authRoutes");

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const passport = require('passport');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

require('../config/passport')(passport);
app.use(passport.initialize());

const mongoURI = 'mongodb+srv://ravindu:Ravindu0627@cluster0.z6eqoh8.mongodb.net/mobile_mart?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
                try {
                    const User = require('./models/userModel');
                    const indexes = await User.collection.indexes();
                    const mobileIndex = indexes.find((idx) => idx.key && idx.key.mobile === 1);
                    if (mobileIndex && !mobileIndex.sparse) {
                        try {
                            await User.collection.dropIndex(mobileIndex.name || 'mobile_1');
                            console.log('Dropped non-sparse mobile index');
                        } catch (dropErr) {
                            console.warn('Could not drop mobile index:', dropErr.message || dropErr);
                        }
                    }
                    await User.collection.createIndex({ mobile: 1 }, { unique: true, sparse: true });
                    console.log('Ensured sparse unique index on mobile');
                } catch (idxErr) {
                    console.warn('Index setup warning:', idxErr.message || idxErr);
                }
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
connectDB();

const startServer = app.listen(port,host,()=>{
    console.log(`Server is running on http://${host}:${port}`);
});
app.use('/api',router);

app.use('/auth', authRoutes);