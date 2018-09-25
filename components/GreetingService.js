"use strict"

var userProfileService = require('./utils/userProfileService');

module.exports = {

    metadata: () => ({
        "name": "GreetingService",
        "properties": {"userName": { "type": "string", "required": false }},
        "supportedActions": [
        ]
    }),

    invoke: (conversation, done) => {
        let userName = userProfileService.getUserName(conversation);
        let responeText = `Hi ${userName}\nNice to meet you.`;
        conversation.reply({text:responeText});
        conversation.transition();
        conversation.exit();
        done();
    }
};
