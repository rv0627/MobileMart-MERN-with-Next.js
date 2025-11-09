const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');

router.post('/create-session', paymentController.createPaymentIntent);
router.post('/verify-session', paymentController.verifySession);

module.exports = router;

