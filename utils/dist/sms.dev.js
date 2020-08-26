"use strict";

var BULK_SMS_API_KEY = 'YRsk57Y7el80gMBMPhhsAhfh5wYOa6IjvjYGDuWS3B1cLen3559KW8lP2GUx';
var BULK_SMS_API_URL = 'https://www.bulksmsnigeria.com/api/v1/sms/create';
var BULK_SMS_API_SENDER = 'FIRSHALAL';

var startsWith = function startsWith(phoneNumber, _char) {
  var firstChar = phoneNumber.split('')[0];
  if (firstChar === _char) return true;
  return false;
};

var sendSms = function sendSms(phoneNumber, message) {
  phoneNumber = phoneNumber.trim();

  if (startsWith(phoneNumber, '+')) {
    phoneNumber = phoneNumber.substr(1);
  } else if (startsWith(phoneNumber, '0')) {
    phoneNumber = '234' + phoneNumber.substr(1);
  }

  var client = require('request');

  bulkSmsUrl = BULK_SMS_API_URL + '?api_token=' + BULK_SMS_API_KEY + '&from=' + BULK_SMS_API_SENDER + '&to=' + phoneNumber + '&body=' + message;
  res = client.post(bulkSmsUrl, {}, function (error, res, body) {
    if (error) {
      console.log(error);
      return;
    }

    console.log('statusCode: ' + res.statusCode);
    console.log(body);
  });
};

module.exports = sendSms;