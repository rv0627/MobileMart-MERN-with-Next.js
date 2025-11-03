const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/createuser', userController.createUser);
router.post('/userLogin', userController.userLogin);

module.exports = router;