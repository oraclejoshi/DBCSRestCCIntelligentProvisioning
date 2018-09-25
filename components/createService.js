"use strict"
var request = require('request');

module.exports = {

  metadata: () => ({
    "name": "createService",
    "properties": {
      "containerName": { "type": "string", "required": true },
      "serviceName": { "type": "string", "required": true }
    },
    "supportedActions": [
    ]
  }),

  invoke: (conversation, done) => {

    let serviceName = conversation.properties().serviceName ? conversation.properties().serviceName : '';
    let containerName = conversation.properties().containerName ? conversation.properties().containerName : '';

    var query = "serviceName=" + serviceName;
    query += "&containerName=" + containerName; 

    console.log("query: "+query);

    var options = {
      method: 'POST',
      url: 'https://E042F03AF7044CC2827DF8D88284E12C.mobile.ocp.oraclecloud.com:443/mobile/custom/DBCSRest/createService?' + query,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic RTA0MkYwM0FGNzA0NENDMjgyN0RGOEQ4ODI4NEUxMkNfTW9iaWxlQW5vbnltb3VzX0FQUElEOjc4NmUyNzNhLTVlNDgtNDE0OS1iZTk2LTU2YmI2ZjcyMDcwYQ==',
        'Oracle-Mobile-Backend-Id': '0d5dc20f-9996-41e8-8c35-fef1900acf94',
        "Connection": "keep-alive"
      },
      timeout: 180000,
    };

    request(options, function (error, response, body) {
      if (error) {
        console.log("error: " + JSON.stringify(error));
        if(error.message == "socket hang up"){
          conversation.reply("Database create request accepted, it will be created shortly.");
        }else{
          conversation.reply("There was issue creating a Database, please try later.");
        }        
			}
    
      if(response){
        if (response.statusCode == 201 || response.statusCode == 202) {
          var text = "Database create request accepted, it will be created shortly.";      
          conversation.reply(text);
        } else {
          console.log("body: " + JSON.stringify(body));
          conversation.reply("There was issue creating a Database, please try later");
        }
      }

      conversation.keepTurn(true);
      conversation.transition(true);
      done();
    });

  }
};
