'use strict';
require('../bootstrap');
var WorkflowMax = require('../../lib/connector');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var config = require('config');

describe('WorkflowMaxConnector', function () {
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
      response = connector.get('job.api');
    });
    it('returns expected json', function () {
      return expect(response.then(function (json) {
        return json.Response.Jobs.Job.length;
      }).catch(function(err) {
        console.log("error", err);
      })).to.become(expectedResponse.Response.Jobs.Job.length);
    });
  });
});
