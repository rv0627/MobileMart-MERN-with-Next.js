const express = require('express');
const app = express();
const cors = require('cors');

const port = 3001;
const host = '127.0.0.1'
const mongoose = require('mongoose');
const router = require('./router');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoURI = 'mongodb+srv://ravindu:Ravindu0627@cluster0.z6eqoh8.mongodb.net/mobile_mart?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
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