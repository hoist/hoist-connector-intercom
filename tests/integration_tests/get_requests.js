'use strict';
require('../bootstrap');
var Intercom = require('../../lib/connector');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var config = require('config');

describe.skip('Integration: IntercomConnector #get', function () {
  describe('valid connection to get users with query', function () {
    var response;
    var connector;
    var expectedResponse = require(path.resolve(__dirname, '../fixtures/responses/get_user.json'));
    before(function () {
      connector = new Intercom({
        apiKey: config.apiKey,
        appId: config.appId,
      });
      response = connector.get('users', {email: 'jamie.wilsons+testingagain@gmail.com'});
    });
    it('returns expected json', function () {
      return expect(response.then(function (json) {
        return json.id;
      }).catch(function(err) {
        console.log("error", err);
      })).to.become(expectedResponse.id);
    });
  });
});
