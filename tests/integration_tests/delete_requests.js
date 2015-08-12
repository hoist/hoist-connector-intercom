'use strict';
require('../bootstrap');
var WorkflowMax = require('../../lib/connector');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var config = require('config');

describe.skip('Integration: WorkflowMaxConnector #delete', function () {
  this.timeout(500000);
  describe('valid connection to delete contacts', function () {
    var response;
    var connector;
    var expectedResponse = require(path.resolve(__dirname, '../fixtures/responses/delete_contact.api.json'));
    before(function () {
      connector = new WorkflowMax({
        apiKey: config.apiKey,
        accountKey: config.accountKey
      });
      response = connector.delete('client.api/contact/3500761');
    });
    it('returns expected json', function () {
      return expect(response.then(function (json) {
        return json.Response.Contact.Name;
      }).catch(function(err) {
        console.log("error", err);
      })).to.become(expectedResponse.Response.Contact.Name);
    });
  });
});
