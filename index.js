const express = require("express");
const axios = require('axios').default;
const xmlbuilder2 = require('xmlbuilder2')
const USPS = require('usps-webtools');
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require('mongoose');

app.use(express.json());
app.set("view engine", "ejs");
app.use(cors());

// Router Files
const routersfile = require('./routers/routersfile')
const stripePayment = require('./routers/stripePayment')
const uspsAPI = require('./routers/uspsAddressCheck')
const twilioAPI = require('./routers/twilioAccessTokenCreate')

// ROUTERS
app.use('/api', routersfile)

app.use('/pay', stripePayment)

app.use('/address', uspsAPI)

app.use('/twilio', twilioAPI)


// mongoDb connection
// var DATABASE_CONNECTION_STRING = "mongodb+srv://Flutter_data:2ke1pwZ7TcCKf4xT@cluster0.5kghi.mongodb.net/test"
// // This is where your API is making its initial connection to the database
// mongoose.Promise = global.Promise
// mongoose.connect(DATABASE_CONNECTION_STRING, {
//     useNewUrlParser: true,
// }).then((res) => {
//     // console.log("res", res)
// })


// // aggregation functions.
// app.post("/aggregate", (req, res, next) => {
//     const refreshToken = req.body.token;
//     if (!refreshToken || !refreshTokens.includes(refreshToken)) {
//         return res.json({ message: "Refresh token not found, login again" });
//     }

//     // If the refresh token is valid, create a new accessToken and return it.
//     jwt.verify(refreshToken, "refresh", (err, user) => {
//         if (!err) {
//             const accessToken = jwt.sign({ username: user.name }, "access", {
//                 expiresIn: "5s"
//             });
//             return res.json({ success: true, accessToken });
//         } else {
//             return res.json({
//                 success: false,
//                 message: "Invalid refresh token"
//             });
//         }
//     });
// });


app.listen(5000, () => console.log("Running at 5000"));
