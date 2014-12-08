'use strict';
require('../bootstrap');
var WorkflowMax = require('../../lib/connector');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var config = require('config');

describe.skip('WorkflowMaxConnector #post', function () {
  // wfm user license limit reached, needs a new accountkey each test
  this.timeout(500000);
  describe('valid connection to post staff with json object', function () {
    var response;
    var connector;
    var data = {Staff:{Name:"John"}};
    // var expectedResponse = require(path.resolve(__dirname, '../fixtures/responses/post_job.api.json'));
    before(function () {
      connector = new WorkflowMax({
        apiKey: config.apiKey, 
        accountKey: config.accountKey
      });
      response = connector.post('staff.api/add', data);
    });
    it('returns expected json', function () {
      return expect(response.then(function (json) {
        console.log(json);
        // return json.Response.Jobs.Job.length;
      }).catch(function(err) {
        console.log("error", err);
      }))//.to.become(expectedResponse.Response.Jobs.Job.length);
    });
  });
});
