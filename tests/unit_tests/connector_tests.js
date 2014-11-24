'use strict';
require('../bootstrap');
var WorkflowMax = require('../../lib/connector');
var sinon = require('sinon');
var BBPromise = require('bluebird');
var expect = require('chai').expect;
var requestPromise = require('request-promise');
var config = require('config');

describe('XeroConnector', function () {
  var connector;
  before(function () {
    connector = new WorkflowMax({
      apiKey: config.apiKey,
      accountKey: config.accountKey
    });
  });
  describe('#get', function () {
    var response = {};
    var result;
    before(function () {
      sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
      result = connector.get('job.api');
    });
    after(function () {
      connector.request.restore();
    });
    it('calls #request', function () {
      expect(connector.request)
        .to.have.been.calledWith('GET', 'job.api');
    });

  });
});
