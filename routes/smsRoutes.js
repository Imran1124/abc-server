const router = require('express').Router();
const fast2sms = require('fast-two-sms')

router.post(`/sendMessage`, async (req, res) => {
    const options = await fast2sms.sendMessage({
        authorization: process.env.FAST_TWO_SMS,
        message: req.body.message,
        numbers: [req.body.numbers]
    })
    if (options) {
        res.status(200).json(options)
    } else {
        res.status(500).json({ message: 'somthing went wrong' })
    }
})

module.exports = router;

