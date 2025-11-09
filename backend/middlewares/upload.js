const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        // use Date.now() to generate a timestamp for the filename
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});

module.exports = upload;