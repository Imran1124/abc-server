const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
dotenv.config();
app.use(cors());
require('./db/conn');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(__dirname + '/uploads/'));

const PORT = process.env.PORT || 3000

app.use('/razorpay', require('./routes/razorpar'));
app.use('/card', require('./routes/applyCard'));
app.use('/sms', require('./routes/smsRoutes'));

app.get("/", (req, res) => {
    res.send("Hello says the server!");
});


app.listen(PORT, () => {
    console.log(`Server is runing ${PORT}`);
})

