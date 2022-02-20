const router = require('express').Router();
const applyCard = require('../models/applyCardSchema');
const cardSchema = require('../models/generateCardSchema');
const pdf = require('html-pdf');

const pdfTemplate = require('../utils/templates');


router.post('/exists', async (req, res) => {
    const { mobileno } = req.body;
    const userExists = await applyCard.exists({ mobileno: mobileno });
    if (userExists) {
        res.status(200).json({ message: 'user already exit' })
    } else {
        res.status(201).json({ message: 'not register' })
    }
})

router.post('/apply', async (req, res) => {
    const {
        name,
        email,
        mobileno,
        dateofbirth,
        fathername,
        language,
        gender,
        mariatalstatus,
        caddress,
        paddress,
        education,
        skill,
        experience,
        fromdate,
        todate,
        position,
        company,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;

    const saveData = new applyCard({
        name,
        email,
        mobileno,
        dateofbirth,
        fathername,
        language,
        gender,
        mariatalstatus,
        caddress,
        paddress,
        education,
        skill,
        experience,
        fromdate,
        todate,
        position,
        company,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    });
    try {
        const save = await saveData.save();

        res.status(200).json({ _id: saveData._id, message: 'created successfully' });
    } catch (error) {
        res.status(400).json(error);
    }

});

router.post('/create-pdf', async (req, res) => {
    try {
        const { mobileno } = req.body;
        pdf.create(pdfTemplate(req.body), {}).toFile(`uploads/${mobileno}.pdf`, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'faild' });
            }
            // const { mobileno } = req.body
            const saveData = new cardSchema({
                mobileno: mobileno,
                file: mobileno + `.pdf`
            });
            try {
                const save = await saveData.save();
                res.status(200).json({ _id: saveData._id, message: 'created successfully' });
            } catch (error) {
                res.status(400).json({ message: 'error' });
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/read/:id', async (req, res) => {
    const { id } = req.params;
    const result = await applyCard.findOne({ _id: id });
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ message: 'somthing wrong' })
    }
})

module.exports = router;