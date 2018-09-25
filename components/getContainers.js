"use strict"
var request = require('request');

module.exports = {

  metadata: () => ({
    "name": "getContainers",
    "properties": {
      "serviceName": { "type": "string", "required": false }
    },
    "supportedActions": []
  }),

  invoke: (conversation, done) => {

    let serviceName = conversation.properties().serviceName ? conversation.properties().serviceName : '';

    var query = "serviceName=" + serviceName;

    console.log("query: "+query);

    var options = {
      method: 'GET',
      url: 'https://E042F03AF7044CC2827DF8D88284E12C.mobile.ocp.oraclecloud.com:443/mobile/custom/DBCSRest/getContainers?' + query,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic RTA0MkYwM0FGNzA0NENDMjgyN0RGOEQ4ODI4NEUxMkNfTW9iaWxlQW5vbnltb3VzX0FQUElEOjc4NmUyNzNhLTVlNDgtNDE0OS1iZTk2LTU2YmI2ZjcyMDcwYQ==',
        'Oracle-Mobile-Backend-Id': '0d5dc20f-9996-41e8-8c35-fef1900acf94',
      }
    };

    request(options, function (error, response, body) {
      if (error) {
				console.log("error: " + JSON.stringify(error));
        conversation.reply("There was issue fetching storage containers, please try later, " + error.message);
			}
    
      if (response.statusCode == 200) {
        //var text = "DB Create Request accepted, please check after 10-15 minutes for the status."; 
        //"DBaaS\nMobileMetadata\nOMCeDev\nOMCeDev2\nOMCeDev3\n_apaas\nbackupiot\ncontentstorageiot\ndev2\njourneyC\njourneyIOT\nprodomceprodRRfZ5\nsample"    
        var listdata = body.replace("\n", ",");
        conversation.variable("listDataVar", listdata);
        conversation.transition();
        conversation.keepturn(true);
        conversation.reply(JSON.stringify(body));
        //conversation.reply(body);
      } else {
        console.log("body: " + JSON.stringify(body));
        console.log("response: " + JSON.stringify(response));
        conversation.reply("There was issue fetching storage containers, please try later");
      }

      conversation.keepTurn(true);
      conversation.transition(true);
      done();
    });

  }
};
