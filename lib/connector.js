'use strict';
var BBPromise = require('bluebird');
var requestPromise = require('request-promise');
var xml2js = require('xml2js');
var baseUrl = 'https://api.workflowmax.com';
var logger = require('hoist-logger');
var url = require('url');
var _ = require('lodash');
var errors = require('hoist-errors');

function WorkflowMaxConnector(settings) {
  logger.info({
    settings: settings
  }, 'constructed workflowmax-connector');
  // console.log('wfm settings',settings);
  this.settings = settings;
  this.parser = BBPromise.promisifyAll(new xml2js.Parser({
    explicitArray: false,
    ignoreAttrs: false,
    async: true
  }));
}

WorkflowMaxConnector.prototype.get = function get(url, queryParams) {
  logger.info('inside hoist-connector-workflowmax.get');
  if(!url){
    throw new errors.connector.request.InvalidError('no path specified');
  }
  return this.request('GET', url, queryParams);
};

WorkflowMaxConnector.prototype.request = function request(method, path, queryParams) {
  logger.info({
    method: method,
    path: path
  }, 'inside hoist-connector-workflowmax.request');
  // console.log('wfm connector',this);
  path = path[path.length -1] === '/'? path.slice(0, -1) : path;
  var uri = url.resolve(baseUrl, path);
  var parsedUrl = url.parse(uri, true);
  parsedUrl.search = null;
  if(queryParams){
    parsedUrl.query = _.extend(parsedUrl.query, queryParams);
  }
  parsedUrl.query = _.extend({apiKey:this.settings.apiKey, accountKey:this.settings.accountKey}, parsedUrl.query);
  uri = url.format(parsedUrl);
  var options = {
    uri : uri,
    method : method,
    resolveWithFullResponse: true
  };
  
  var self = this;

  return this.requestPromiseHelper(options)
    .then(function(request) {
      logger.info({
        xml: request.body
      }, 'got response from request');
      return self.parser.parseStringAsync(request.body);
    });
};

WorkflowMaxConnector.prototype.requestPromiseHelper = function requestPromiseHelper (options) {
  return requestPromise(options);
};


module.exports = WorkflowMaxConnector;
