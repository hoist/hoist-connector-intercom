'use strict';
var BBPromise = require('bluebird');
var requestPromise = require('request-promise');
var xml2js = require('xml2js');
var js2xml = require('jsontoxml');
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

WorkflowMaxConnector.prototype.get = function (url, queryParams) {
  logger.info('inside hoist-connector-workflowmax.get');
  return this.request('GET', url, queryParams);
};

WorkflowMaxConnector.prototype.post = function (url, data) {
  logger.info('inside hoist-connector-workflowmax.post');
  if(!data){
    throw new errors.connector.request.InvalidError('no data specified in post');
  }
  return this.request('POST', url, null, data);
};

WorkflowMaxConnector.prototype.put = function (url, data) {
  logger.info('inside hoist-connector-workflowmax.put');
  if(!data){
    throw new errors.connector.request.InvalidError('no data specified in put');
  }
  return this.request('PUT', url, null, data);
};

WorkflowMaxConnector.prototype.delete = function (url, queryParams, data) {
  logger.info('inside hoist-connector-workflowmax.delete');
  return this.request('DELETE', url, queryParams, data);
};

WorkflowMaxConnector.prototype.request = function request(method, path, queryParams, data) {
  if(!path){
    throw new errors.connector.request.InvalidError('no path specified');
  }
  
  logger.info({
    method: method,
    path: path
  }, 'inside hoist-connector-workflowmax.request');
  // console.log('wfm connector',this);
  path = path[path.length -1] === '/'? path.slice(0, -1) : path;
  var parsedUrl = url.parse(path, true);
  parsedUrl.search = null;
  parsedUrl.query = _.extend({apiKey:this.settings.apiKey, accountKey:this.settings.accountKey}, parsedUrl.query);

  if(queryParams) {
    parsedUrl.query = _.extend(parsedUrl.query, queryParams);
  }
  
  path = url.format(parsedUrl);
  var uri = url.resolve(baseUrl, path);
  var options = {
    uri : uri,
    method : method,
    resolveWithFullResponse: true,
  };
  
  if(method === 'POST' || method === 'PUT') {
    if(typeof data === 'string'){
      try{
        JSON.parse(data);
        data = js2xml(data);
      } catch (e) {} // not json so just pass through
    } else if (typeof data === 'object') {
      data = js2xml(data);
    }
    options.body = data;
    options.contentType = 'application/xml';
  }

  
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
