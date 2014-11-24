'use strict';
var BBPromise = require('bluebird');
var requestPromise = require('request-promise');
var xml2js = require('xml2js');
var baseUrl = 'https://api.workflowmax.com';
var logger = require('hoist-logger');

function WorkflowMaxConnector(settings) {
  logger.info({
    settings: settings
  }, 'constructed workflowmax-connector');
  this.settings = settings;
  this.parser = BBPromise.promisifyAll(new xml2js.Parser({
    explicitArray: false,
    ignoreAttrs: false,
    async: true
  }));
}

WorkflowMaxConnector.prototype.get = function get(url) {
  logger.info('inside hoist-connector-workflowmax.get');
  return this.request('GET', url);
};

WorkflowMaxConnector.prototype.request = function request(method, path) {
  logger.info({
    method: method,
    path: path
  }, 'inside hoist-connector-workflowmax.request');
  
  var options = {
    uri : baseUrl + '/' + path + '/current?apiKey=' + this.settings.apiKey + '&accountKey=' + this.settings.accountKey,
    method : method,
    resolveWithFullResponse: true
  };
  
  var self = this;

  return requestPromise(options)
    .then(function(request) {
      logger.info({
        xml: request.body
      }, 'got response from request');
      return self.parser.parseStringAsync(request.body);
    });
};


module.exports = WorkflowMaxConnector;
