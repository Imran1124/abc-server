const router = require('express').Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

console.log(process.env.RAZORPAY_KEY_ID)

router.post('/verify/razorpay-signature', async (req, res) => {
    console.log(JSON.stringify(req.body));
    const hash = crypto.createHmac("SHA256", "12345678")
        .update(JSON.stringify(req.body))
        .digest("hex");
    console.log(req.headers["x-razorpay-signature"]);
    if (hash === req.headers["x-razorpay-signature"]) {
        res.status(200).json(req.headers["x-razorpay-signature"])
    } else {
        res.status(500).json({ message: 'faild' })
    }
})

router.post('/paynow', async (req, res) => {
    const { userid, amount, currency, } = req.body;
    const options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: currency,
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
        if (err) return res.status(500).json(err)
        return res.status(200).json(order);
    });
});

router.get('/test', async (req, res) => {
    const success = 'Success';
    res.status(200).json({ message: success })
})


module.exports = router;