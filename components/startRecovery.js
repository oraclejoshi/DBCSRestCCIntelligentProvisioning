"use strict"
var request = require('request');

module.exports = {

  metadata: () => ({
    "name": "startRecovery",
    "properties": {
      "containerName": { "type": "string", "required": true },
      "tag": { "type": "string", "required": true }
    },
    "supportedActions": [
    ]
  }),

  invoke: (conversation, done) => {

    let containerName = conversation.properties().containerName ? conversation.properties().containerName : '';
    let tag = conversation.properties().tag ? conversation.properties().tag : '';

    var query = "serviceName=" + containerName;
    query += "&tag=" + tag; 

    console.log("query: "+query);

    var options = {
      method: 'POST',
      url: 'https://E042F03AF7044CC2827DF8D88284E12C.mobile.ocp.oraclecloud.com:443/mobile/custom/DBCSRest/backups/recovery?' + query,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic RTA0MkYwM0FGNzA0NENDMjgyN0RGOEQ4ODI4NEUxMkNfTW9iaWxlQW5vbnltb3VzX0FQUElEOjc4NmUyNzNhLTVlNDgtNDE0OS1iZTk2LTU2YmI2ZjcyMDcwYQ==',
        'Oracle-Mobile-Backend-Id': '0d5dc20f-9996-41e8-8c35-fef1900acf94',
      }
    };

    request(options, function (error, response, body) {
      if (error) {
				console.log("error: " + JSON.stringify(error));
        conversation.reply("There was issue recovering the database, please try later, " + error.message);
			}

      if (response.statusCode == 201 || response.statusCode == 202) {
        var text = "Database recovery initiated!";
        conversation.reply(text);
      } else {
        console.log("body: " + JSON.stringify(body));
        console.log("response: " + JSON.stringify(response));
        conversation.reply("There was issue recovering the database, please try later");
      }

      conversation.keepTurn(true);
      conversation.transition(true);
      done();
    });

  }
};
