'use strict';
require('../bootstrap');
var WorkflowMax = require('../../lib/connector');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var config = require('config');

describe.skip('Integration: WorkflowMaxConnector #post', function () {
  this.timeout(500000);
  describe('valid connection to post client with json object', function () {
    var response;
    var connector;
    var data = {Client:{Name:"John"}};
    before(function () {
      connector = new WorkflowMax({
        apiKey: config.apiKey,
        accountKey: config.accountKey
      });
      response = connector.post('client.api/add', data);
    });
    it('returns expected json', function () {
      return expect(response.then(function (json) {
        return json.Response.Client.Name;
      }).catch(function(err) {
        console.log("error", err);
      })).to.become('John');
    });
  });

  describe('valid connection to post client with xml', function () {
    var response;
    var connector;
    var data = '<Client><Name>John</Name></Client>';
    before(function () {
      connector = new WorkflowMax({
        apiKey: config.apiKey,
        accountKey: config.accountKey
      });
      response = connector.post('client.api/add', data);
    });
    it('returns expected json', function () {
      return expect(response.then(function (json) {
        return json.Response.Client.Name;
      }).catch(function(err) {
        console.log("error", err);
      })).to.become('John');
    });
  });
});
