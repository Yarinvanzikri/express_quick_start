const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const date = require('date-and-time');

class Coupon {
    constructor() {
        this.code = uuidv4().slice(0, 10);
        const now = new Date();
        const pattern = date.compile('YYYY/MM/DD HH:mm:ss');
        this.date = date.format(now, pattern);
        this.isRedeem = false;
    }
}
function getCouponsDb() {
    return require('../db/coupons.json');
}
function getCoupon (code){
    try {
        const couponsDb = getCouponsDb();
        let foundCoupon = couponsDb.find(existCoupon => existCoupon.code === code);
        return foundCoupon;
    }
catch (e) {
    foundCoupon = 'not found';
    return foundCoupon;
}


}
function isValid(code) {
    const coupon = getCouponsDb();
    const foundCoupon = coupon.find(existCoupon => existCoupon.code === code);//return Truthlu value(boolean)
    if (!foundCoupon) {
        return false;
    } else {
        return true;
    }
    return foundCoupon.stringify;
}
function createCouponDb(coupons) {
    if (coupons) {
        fs.writeFileSync("db/coupons.json", JSON.stringify(coupons));
        return true;
    }
    return false;
}
function createCoupon(coupon) {
    if (coupon) {
        let couponsDb = getCouponsDb();
        couponsDb.push(coupon);
        return createCouponDb(couponsDb);
    }
    return false;
}
function updateCoupon(code, data) {
    let coupons = getCouponsDb()
    const coupon = getCoupon(code);
    coupons = coupons.filter((couponCode)=> {
        return couponCode.code !== coupon.code;
    })
    if ('isRedeem' in data) {
        coupon.isRedeem = data.isRedeem;
    }
    if ('code' in data) {
        coupon.code = data.code;
    }
    coupons.push(coupon);
    createCouponDb(coupons);
}
function deleteCoupon(code) {
        let coupons = getCouponsDb()
        const coupon = getCoupon(code);
        coupons = coupons.filter((couponCode) => {
            return couponCode.code !== coupon.code;
        })
        createCouponDb(coupons)
    }
function redeem (code){
        const coupon = getCoupon(code);
        if (coupon.isRedeem === true) {
            return true;
        } else
            deleteCoupon(code)
            coupon.isRedeem = true;
            createCoupon(Coupon)
            return false;
    }
module.exports = {
    Coupon,
    deleteCoupon,
    createCoupon,
    getCouponsDb,
    getCoupon,
    isValid,
    updateCoupon,
    redeem,
}