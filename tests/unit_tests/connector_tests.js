'use strict';
require('../bootstrap');
var Intercom = require('../../lib/connector');
var sinon = require('sinon');
var BBPromise = require('bluebird');
var expect = require('chai').expect;
var requestPromise = require('request-promise');
var config = require('config');
var errors = require('@hoist/errors');

describe('IntercomConnector', function () {
  var connector;
  before(function () {
    connector = new Intercom({
      apiKey: config.apiKey,
      appId: config.appId
    });
  });
  describe('#get', function () {
    describe('with no queryParams', function () {
      var response = {};
      var result;
      before(function () {
        sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
        result = connector.get('contacts');
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('GET', 'contacts', undefined);
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
        result = connector.get('contacts', queryParams);
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('GET', 'contacts', queryParams);
      });
    });
  });
  describe('#post', function() {
    describe('with no data', function () {
      it('rejects', function () {
        expect(function () {
          connector.post('/contacts');
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
        result = connector.post('contacts', data);
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('POST', 'contacts', null, data);
      });
    });
  });
  describe('#put', function() {
    describe('with no data', function () {
      it('rejects', function () {
        expect(function () {
          connector.put('/contacts');
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
        result = connector.put('contacts', data);
      });
      after(function () {
        connector.request.restore();
      });
      it('calls #request', function () {
        expect(connector.request)
          .to.have.been.calledWith('PUT', 'contacts', null, data);
      });
    });
  });
  describe('#delete', function () {
    var response = {};
    var result;
    before(function () {
      sinon.stub(connector, 'request').returns(BBPromise.resolve(response));
      result = connector.delete('contacts');
    });
    after(function () {
      connector.request.restore();
    });
    it('calls #request', function () {
      expect(connector.request)
        .to.have.been.calledWith('DELETE', 'contacts', undefined, undefined);
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
          auth: { 
            pass: config.apiKey, 
            user: config.appId 
          },
          headers: { 
            Accept: "application/json" 
          },
          resolveWithFullResponse: true,
          uri: 'https://api.intercom.io/contacts'
        }
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('GET', '/contacts');
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
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
          auth: { 
            pass: config.apiKey, 
            user: config.appId 
          },
          headers: { 
            Accept: "application/json" 
          },
          resolveWithFullResponse: true,
          uri: 'https://api.intercom.io/contacts?query=' + queryParams.query
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('GET', 'contacts', queryParams);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });

      describe('with queryParams in path', function () {
        var response = {
          body: 'body'
        };
        var options = {
          method: 'GET',
          auth: { 
            pass: config.apiKey, 
            user: config.appId 
          },
          headers: { 
            Accept: "application/json" 
          },
          resolveWithFullResponse: true,
          uri: 'https://api.intercom.io/contacts?query=query'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('GET', 'contacts?query=query');
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });
    });
    describe('POST', function () {
      describe('with json string', function () {
        var response = {
          body: 'body'
        };
        var data = '{"Staff":{"Name":"John"}}';
        var options = {
          auth: { 
            pass: config.apiKey, 
            user: config.appId 
          },
          headers: { 
            Accept: "application/json" 
          },
          json: true,
          method: 'POST',
          resolveWithFullResponse: true,
          uri: 'https://api.intercom.io/contacts',
          body: data,
          contentType: 'application/json'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('POST', 'contacts', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });
      describe('with object', function () {
        var response = {
          body: 'body'
        };
        var data = {Staff:{Name:"John"}};
        var options = {
          method: 'POST',
          auth: { 
            pass: config.apiKey, 
            user: config.appId 
          },
          headers: { 
            Accept: "application/json" 
          },
          json: true,
          resolveWithFullResponse: true,
          uri: 'https://api.intercom.io/contacts',
          body: data,
          contentType: 'application/json'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('POST', 'contacts', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });
    });
    describe('PUT', function () {
      describe('with json string', function () {
        var response = {
          body: 'body'
        };
        var data = '{"Staff":{"Name":"John"}}';
        var options = {
          method: 'PUT',
          auth: { 
            pass: config.apiKey, 
            user: config.appId 
          },
          json: true,
          headers: { 
            Accept: "application/json" 
          },
          resolveWithFullResponse: true,
          uri: 'https://api.intercom.io/contacts',
          body: data,
          contentType: 'application/json'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('PUT', 'contacts', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
        });
      });
      describe('with object', function () {
        var response = {
          body: 'body'
        };
        var data = {Staff:{Name:"John"}};
        var options = {
          method: 'PUT',
          auth: { 
            pass: config.apiKey, 
            user: config.appId 
          },
          json: true,
          headers: { 
            Accept: "application/json" 
          },
          resolveWithFullResponse: true,
          uri: 'https://api.intercom.io/contacts',
          body: data,
          contentType: 'application/json'
        };
        var result;
        before(function () {
          sinon.stub(connector, 'requestPromiseHelper').returns(BBPromise.resolve(response));
          result = connector.request('PUT', 'contacts', null, data);
        });
        after(function () {
          connector.requestPromiseHelper.restore();
        });
        it('calls requestPromiseHelper', function () {
          expect(connector.requestPromiseHelper)
            .to.have.been.calledWith(options);
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
