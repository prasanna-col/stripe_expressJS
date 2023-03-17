const express = require('express')
const router = express.Router()
const sendbird = require('sendbird');




router.get('/get_senbird_users', (req, res) => {

    const sb = new sendbird(
        {
            appId: '308C0873-CB0C-4843-955C-9D605F87B342',
            apiKey: 'd9f6f64203427391e6fddef5c4849df56c6fec85'
        }
    );
    console.log("sb", sb)
    if (sb) {
        sb.getAllUsers((users, error) => {
            if (error) {
                console.error(error);
            } else {
                // Loop through each user and send a message
                users.forEach((user) => {
                    console.log("user", user)
                    // const message = {
                    //     channelUrl: 'YOUR_CHANNEL_URL', // Specify the channel URL where you want to send the message
                    //     message: 'YOUR_MESSAGE', // Specify the message content
                    //     data: null, // Optional. Specify any additional data you want to attach to the message
                    //     customType: null, // Optional. Specify any custom type for the message
                    //     targetLanguages: [], // Optional. Specify any target languages for the message
                    // };
                    // // Send the message to the user
                    // sb.sendUserMessage(user.userId, message, (message, error) => {
                    //     if (error) {
                    //         console.error(error);
                    //         res.send({
                    //             "err": error
                    //         })
                    //     } else {
                    //         console.log(`Message sent to user ${user.userId}`);
                    //         res.send({
                    //             "sent_to_user": user.userId
                    //         })
                    //     }
                    // });
                });
                res.send({
                    "msg": "success"
                })
            }
        });
    }

});

module.exports = router