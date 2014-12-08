'use strict';
require('../bootstrap');
var WorkflowMax = require('../../lib/connector');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var config = require('config');

describe('WorkflowMaxConnector #get', function () {
  this.timeout(500000);
  describe('valid connection to get jobs', function () {
    var response;
    var connector;
    var expectedResponse = require(path.resolve(__dirname, '../fixtures/responses/get_job.api.json'));
    before(function () {
      connector = new WorkflowMax({
        apiKey: config.apiKey, 
        accountKey: config.accountKey
      });
      response = connector.get('job.api/get/J0001');
    });
    it('returns expected json', function () {
      return expect(response.then(function (json) {
        return json.Response.Job.Name;
      }).catch(function(err) {
        console.log("error", err);
      })).to.become(expectedResponse.Response.Job.Name);
    });
  });
  describe('valid connection to get clients with query', function () {
    var response;
    var connector;
    var expectedResponse = require(path.resolve(__dirname, '../fixtures/responses/get_client.api.json'));
    before(function () {
      connector = new WorkflowMax({
        apiKey: config.apiKey, 
        accountKey: config.accountKey
      });
      response = connector.get('client.api/search', {query:'monkey'});
    });
    it('returns expected json', function () {
      return expect(response.then(function (json) {
        return json.Response.Clients.Client.Name;
      }).catch(function(err) {
        console.log("error", err);
      })).to.become(expectedResponse.Response.Clients.Client.Name);
    });
  });
  describe('valid connection to get clients with query in path', function () {
    var response;
    var connector;
    var expectedResponse = require(path.resolve(__dirname, '../fixtures/responses/get_client.api.json'));
    before(function () {
      connector = new WorkflowMax({
        apiKey: config.apiKey, 
        accountKey: config.accountKey
      });
      response = connector.get('client.api/search?query=monkey');
    });
    it('returns expected json', function () {
      return expect(response.then(function (json) {
        return json.Response.Clients.Client.Name;
      }).catch(function(err) {
        console.log("error", err);
      })).to.become(expectedResponse.Response.Clients.Client.Name);
    });
  });
});
