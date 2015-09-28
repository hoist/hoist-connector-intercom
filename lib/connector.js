'use strict';
var baseUrl = 'https://api.intercom.io';
var BBPromise = require('bluebird');
var requestPromise = require('request-promise');
var logger = require('@hoist/logger');
var url = require('url');
var _ = require('lodash');
var errors = require('@hoist/errors');


function IntercomConnector(settings) {
  logger.info({
    settings: settings
  }, 'constructed intercom-connector');
  this.settings = settings;
}

IntercomConnector.prototype.get = function (url, queryParams) {
  logger.info('inside hoist-connector-intercom.get');
  return this.request('GET', url, queryParams);
};

IntercomConnector.prototype.post = function (url, data) {
  logger.info('inside hoist-connector-intercom.post');
  if(!data){
    throw new errors.connector.request.InvalidError('no data specified in post');
  }
  return this.request('POST', url, null, data);
};

IntercomConnector.prototype.put = function (url, data) {
  logger.info('inside hoist-connector-intercom.put');
  if(!data){
    throw new errors.connector.request.InvalidError('no data specified in put');
  }
  return this.request('PUT', url, null, data);
};

IntercomConnector.prototype.delete = function (url, queryParams, data) {
  logger.info('inside hoist-connector-intercom.delete');
  return this.request('DELETE', url, queryParams, data);
};

IntercomConnector.prototype.request = function request(method, path, queryParams, data) {
  if(!path){
    throw new errors.connector.request.InvalidError('no path specified');
  }

  logger.info({
    method: method,
    path: path
  }, 'inside hoist-connector-intercom.request');
  
  /* If a forward slash is provided, remove it */
  path = path[path.length -1] === '/'? path.slice(0, -1) : path;

  var parsedUrl = url.parse(path, true);
  
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
    options.body = data;
    options.contentType = 'application/json';
  }


  var self = this;

  return this.requestPromiseHelper(options)
    .then(function(request) {
      logger.info({
        json: request.body
      }, 'got response from request');
      return self.parser.parseStringAsync(request.body);
    });

};

IntercomConnector.prototype.requestPromiseHelper = function requestPromiseHelper (options) {
  return requestPromise(options);
};

module.exports = IntercomConnector;
