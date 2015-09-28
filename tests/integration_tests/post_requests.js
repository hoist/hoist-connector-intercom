'use strict';
require('../bootstrap');
var Intercom = require('../../lib/connector');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var config = require('config');

describe.skip('Integration: IntercomConnector #post', function () {
  describe('valid connection to post user with json object', function () {
    var response;
    var connector;
    var data = {email: 'test@testing.com', name: 'Johns Full'};
    before(function () {
      connector = new Intercom({
        apiKey: config.apiKey,
        appId: config.appId
      });
      response = connector.post('users', data);
    });
    it('returns expected json', function () {
      return expect(response.then(function (json) {
        return json.name;
      }).catch(function(err) {
        console.log("error", err);
      })).to.become('Johns Full');
    });
  });
});
