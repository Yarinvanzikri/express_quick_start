const express = require('express');
const router = express.Router();

router.use('/user', require('./routes/userRoutes'));
router.use('/coupon', require('./routes/couponRoutes'));

module.exports = router;
