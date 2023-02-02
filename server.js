require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const Twilio = require('twilio');

var keys = {
  "TWILIO_ACCOUNT_SID": process.env.TWILIO_ACCOUNT_SID,
  "TWILIO_API_KEY": process.env.TWILIO_API_KEY,
  "TWILIO_API_SECRET": process.env.TWILIO_API_SECRET,
  "TWILIO_CHAT_SERVICE_SID": process.env.TWILIO_CHAT_SERVICE_SID,
}
console.log("keys", keys)


const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const chatGrant = new ChatGrant({
  serviceSid: keys.TWILIO_CHAT_SERVICE_SID,
});

const client = require('twilio')(keys.TWILIO_ACCOUNT_SID, keys.TWILIO_API_KEY);

app.get('/token/:identity', (req, res) => {
  const identity = req.params.identity;
  const token = new AccessToken(
    keys.TWILIO_ACCOUNT_SID,
    keys.TWILIO_API_KEY,
    keys.TWILIO_API_SECRET,
  );

  console.log("token", token)

  token.identity = identity;
  token.addGrant(
    new ChatGrant({
      serviceSid: keys.TWILIO_CHAT_SERVICE_SID,
    }),
  );
  console.log("token identity", token)
  res.send({
    identity: token.identity,
    jwt: token.toJwt(),
  });
});



app.get('/createUser', (req, res) => {
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
app.get('/CreateAccessTokens', (req, res) => {
  const token = new AccessToken(
    keys.TWILIO_ACCOUNT_SID,
    keys.TWILIO_API_KEY,
    keys.TWILIO_API_SECRET,
    { identity: "prasanna" }
  );
  token.addGrant(chatGrant);
  console.log(token.toJwt());
  res.send({
    message: "success",
    token: token.toJwt()
  });

})



app.listen(3001, function () {
  console.log('Programmable Chat server running on port 3001!');
});
