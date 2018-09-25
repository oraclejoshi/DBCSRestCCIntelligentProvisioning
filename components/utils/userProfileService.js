"use strict"

var _ = require('lodash');

function findByKey(obj, key) {
    if (_.has(obj, key))
        return [obj];
    return _.flatten(_.map(obj, function(v) {
        return typeof v == "object" ? findByKey(v, key) : [];
    }), true);
}

module.exports = {

    getUserName: (conversation)  =>{
        let userName = '';
        if(conversation.channelType() == 'webhook') {
            let fNameArray = findByKey(conversation.request().context,'firstName');
            let lNameArray = findByKey(conversation.request().context,'lastName');
            let fName = fNameArray.length > 0 ? fNameArray[0].firstName.value : '';
            let lName = fNameArray.length > 0 ? lNameArray[0].lastName.value : '';
            userName = fName+" "+lName;
        }
        return userName;
    }
    
};

