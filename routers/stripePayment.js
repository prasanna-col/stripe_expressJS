/**
    * Referance code: https://www.digitalocean.com/community/tutorials/how-to-use-aggregations-in-mongodb
*/


// var PUB_KEY = "pk_test_51MEulFSIFs9LpgQO6oiffHlcWd6NKmNCcUikMjdcUm0PLFKcO1uPdTY5bhVqMKICyRRW53mZChmJGXctBDkm7Xte00tHX4L38h";
// var SEC_KEY = "sk_test_51MEulFSIFs9LpgQOSz5iCGMnwQX7surbNNe6Fu17NhWM4tchYvEwCwuGZ838tdHUYq3vAZas8piUEX2oOqSUJYfW00V0qhJrFQ";

require("dotenv").config();
const express = require('express')
const router = express.Router()
// const stripe = require("stripe")(process.env.SEC_KEY); // https://stripe.com/docs/keys#obtain-api-keys

const Stripe = require('stripe');
const stripe = Stripe(process.env.SEC_KEY)


router.post("/checkout", async (req, res) => {

    console.log("checkout req ---------------------->", req.body)
    var requestData = req.body

    const { bill_amount, currency } = req.body
    // Create or retrieve the Stripe Customer object associated with your user.
    let customer = await stripe.customers.create(); // This example just creates a new Customer every time

    // Create an ephemeral key for the Customer; this allows the app to display saved payment methods and save new ones
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2020-08-27' }
    );

    // Create a PaymentIntent with the payment amount, currency, and customer
    const paymentIntent = await stripe.paymentIntents.create({
        amount: bill_amount * 100,
        currency: currency,
        customer: customer.id
    });

    // Send the object keys to the client
    res.send({
        publishableKey: process.env.PUB_KEY, // https://stripe.com/docs/keys#obtain-api-keys
        paymentIntent: paymentIntent.client_secret,
        customer: customer.id,
        ephemeralKey: ephemeralKey.secret
    });
})

// app.post("/checkout", async (req, res) => { 

//   });



module.exports = router