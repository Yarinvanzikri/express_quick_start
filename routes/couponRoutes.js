const express = require('express');
const router = express.Router();
const couponService = require('../services/couponService');

router.post('/', (req, res) => {
    let p = new couponService.Coupon()
    let result = couponService.createCoupon(p);
    if (result === true) {
        return res.status(201).send(result);
    } else {
        res.status(400).send(result);
    }

});

router.get('/', (req, res) => {
    const coupon = couponService.getCouponsDb();
    res.send(coupon);
});

router.get('/:code', (req, res) => {
    const {code} = req.params;
    const coupon = couponService.getCoupon(code);
    res.send(coupon);
});

router.put('/:code', (req, res) => {
    const {code} = req.params;
    couponService.updateCoupon(code, req.body);
    res.send("successfully Changed");
});

router.delete('/:code', (req, res) => {
    const {code} = req.params;
    couponService.deleteCoupon(code);
    res.send("successfully Deleted");
})

router.post('/:code/redeem', (req, res) => {
    const {code} = req.params;
    const redeem  = couponService.redeem(code);
    if (redeem){
        res.status(400).send("Coupon already redeemed");
    } else {
        res.status(200).send("Coupon is now redeemed");
    }
})

router.get('/search/:code', (req, res) => {
    const {code} = req.params;
    const exist = couponService.getCoupon(code);
    if(exist.code === undefined){
        res.status(400).send("Coupon does not exist");
    } else {
        res.status(200).send("Coupon exists").send(exist);

    }

})

module.exports = router;