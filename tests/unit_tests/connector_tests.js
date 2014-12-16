'use strict';
require('../bootstrap');
var WorkflowMax = require('../../lib/connector');
var sinon = require('sinon');
var BBPromise = require('bluebird');
var expect = require('chai').expect;
var requestPromise = require('request-promise');
var config = require('config');
var errors = require('hoist-errors');

describe('WorkflowMaxConnector', function () {
  var connector;
  before(function () {
    connector = new WorkflowMax({
      apiKey: config.apiKey,
      accountKey: config.accountKey
    });
  });
  describe('#get', function () {
    describe('with no queryParams', function () {
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
          .to.have.been.calledWith('GET', 'job.api', undefined);
      });
    });
    describe('with queryParams', function () {
      var response = {};
      var result;
      var queryParams = {
        query: 'query'
      };
      before(function () {
        sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
        result = connector.get('job.api', queryParams);
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('GET', 'job.api', queryParams);
      });
    });
  });
  describe('#post', function() {
    describe('with no data', function () {
      it('rejects', function () {
        expect(function () {
          connector.post('/path');
        }).to.throw(errors.connector.request.InvalidError);
      });
    });
    describe('with data', function () {
      var response = {};
      var result;
      var data = {
        query: 'query'
      };
      before(function () {
        sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
        result = connector.post('staff.api/add', data);
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('POST', 'staff.api/add', null, data);
      });
    });
  });
  describe('#put', function() {
    describe('with no data', function () {
      it('rejects', function () {
        expect(function () {
          connector.put('/path');
        }).to.throw(errors.connector.request.InvalidError);
      });
    });
    describe('with data', function () {
      var response = {};
      var result;
      var data = {
        query: 'query'
      };
      before(function () {
        sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
        result = connector.put('client.api/update', data);
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('PUT', 'client.api/update', null, data);
      });
    });
  });
  describe('#delete', function () {
    var response = {};
    var result;
    before(function () {
      sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
      result = connector.delete('job.api');
    });
    after(function () {
      connector.request.restore();
    });
    it('calls #request', function () {
      expect(connector.request)
        .to.have.been.calledWith('DELETE', 'job.api', undefined, undefined);
    });
  });
  describe('#request', function () {
    describe('GET', function () {
      describe('with no queryParams', function () {
        var response = {
          body: 'body'
        };
        var options = {
          method: 'GET',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/job.api/current?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey
        }
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('GET', '/job.api/current');
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });

      describe('with queryParams object', function () {
        var response = {
          body: 'body'
        };
        var queryParams = {
          query: 'query'
        };
        var options = {
          method: 'GET',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/job.api/current?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey + '&query=' + queryParams.query
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('GET', 'job.api/current', queryParams);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });

      describe('with queryParams in path', function () {
        var response = {
          body: 'body'
        };
        var options = {
          method: 'GET',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/job.api/current?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey + '&query=query'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('GET', 'job.api/current?query=query');
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });

      describe('with queryParams in path and object', function () {
        var response = {
          body: 'body'
        };
        var queryParams = {
          query: 'query'
        };
        var options = {
          method: 'GET',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/job.api/current?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey + '&querypath=querypath&query=' + queryParams.query
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('GET', 'job.api/current?querypath=querypath', queryParams);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });
      describe('with duplicate queryParams in path and object', function () {
        var response = {
          body: 'body'
        };
        var queryParams = {
          query: 'query'
        };
        var options = {
          method: 'GET',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/job.api/current?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey + '&query=' + queryParams.query
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('GET', 'job.api/current?query=queryfalse', queryParams);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper correctly', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });
    });
    describe('POST', function () {
      describe('with xml string', function () {
        var response = {
          body: 'body'
        };
        var data = '<Staff><Name>John</Name></Staff>';
        var options = {
          method: 'POST',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/staff.api/add?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey,
          body: data,
          contentType: 'application/xml'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('POST', 'staff.api/add', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });
      describe('with json string', function () {
        var response = {
          body: 'body'
        };
        var data = '{"Staff":{"Name":"John"}}';
        var xml = '<Staff><Name>John</Name></Staff>';
        var options = {
          method: 'POST',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/staff.api/add?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey,
          body: xml,
          contentType: 'application/xml'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('POST', 'staff.api/add', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });
      describe('with object', function () {
        var response = {
          body: 'body'
        };
        var data = {Staff:{Name:"John"}};
        var xml = '<Staff><Name>John</Name></Staff>';
        var options = {
          method: 'POST',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/staff.api/add?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey,
          body: xml,
          contentType: 'application/xml'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('POST', 'staff.api/add', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });
    });
    describe('PUT', function () {
      describe('with xml string', function () {
        var response = {
          body: 'body'
        };
        var data = '<Staff><Name>John</Name></Staff>';
        var options = {
          method: 'PUT',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/staff.api/add?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey,
          body: data,
          contentType: 'application/xml'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('PUT', 'staff.api/add', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });
      describe('with json string', function () {
        var response = {
          body: 'body'
        };
        var data = '{"Staff":{"Name":"John"}}';
        var xml = '<Staff><Name>John</Name></Staff>';
        var options = {
          method: 'PUT',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/staff.api/add?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey,
          body: xml,
          contentType: 'application/xml'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('PUT', 'staff.api/add', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });
      describe('with object', function () {
        var response = {
          body: 'body'
        };
        var data = {Staff:{Name:"John"}};
        var xml = '<Staff><Name>John</Name></Staff>';
        var options = {
          method: 'PUT',
          resolveWithFullResponse: true,
          uri: 'https://api.workflowmax.com/staff.api/add?apiKey=' + config.apiKey + '&accountKey=' + config.accountKey,
          body: xml,
          contentType: 'application/xml'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          sinon.stub(connector.parser, 'parseStringAsync').returns(BBPromise.resolve());
          result = connector.request('PUT', 'staff.api/add', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
          connector.parser.parseStringAsync.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
        it('calls parser.parseStringAsync', function () {
          expect(connector.parser.parseStringAsync)
            .to.have.been.calledWith(response.body);
        });
      });
    });
    describe('with no path', function () {
      it('rejects', function () {
        expect(function () {
          connector.request();
        }).to.throw(errors.connector.request.InvalidError);
      });
    });
  });
});
