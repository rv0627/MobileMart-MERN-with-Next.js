const express = require('express');
const router = express.Router();
const userController = require('./userController');
const productController = require('./controller/productController');
const upload = require('./middlewares/upload');

router.post('/createuser', userController.createUser);
router.post('/userLogin', userController.userLogin);

router.post('/addProduct', upload.single("image"), productController.addProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

module.exports = router;