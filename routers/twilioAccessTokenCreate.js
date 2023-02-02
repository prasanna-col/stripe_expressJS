const express = require('express')
const router = express.Router()
const Twilio = require('twilio');

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_API_KEY = process.env.TWILIO_API_KEY; // auth token
const TWILIO_API_SECRET = process.env.TWILIO_API_SECRET;
const TWILIO_CHAT_SERVICE_SID = process.env.TWILIO_CHAT_SERVICE_SID;

const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const chatGrant = new ChatGrant({
    serviceSid: TWILIO_CHAT_SERVICE_SID,
});

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_API_KEY);

router.get('/token/:identity', (req, res) => {
    const identity = req.params.identity;
    const token = new AccessToken(
        TWILIO_ACCOUNT_SID,
        TWILIO_API_KEY,
        TWILIO_API_SECRET,
    );

    console.log("token", token)

    token.identity = identity;
    token.addGrant(
        new ChatGrant({
            serviceSid: TWILIO_CHAT_SERVICE_SID,
        }),
    );
    console.log("token identity", token)
    res.send({
        identity: token.identity,
        jwt: token.toJwt(),
    });
});


router.get('/createUser', (req, res) => {
    console.log(req)
    client.conversations.v1.users
        .create({ identity: 'pavankumarshahshah' })
        .then((user) => {
            console.log(user.sid);
            res.send({
                message: "success",
                user_sid: user.sid
            });
        })
        .catch((err) => {
            res.send({
                message: "failed",
                err
            });
        })


});


// Create Access Tokens for Conversations
router.get('/CreateAccessTokens', (req, res) => {
    const token = new AccessToken(
        TWILIO_ACCOUNT_SID,
        TWILIO_API_KEY,
        TWILIO_API_SECRET,
        { identity: "prasanna" }
    );
    token.addGrant(chatGrant);
    console.log(token.toJwt());
    res.send({
        message: "success",
        token: token.toJwt()
    });

})


module.exports = router