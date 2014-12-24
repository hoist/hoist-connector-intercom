/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/cost.api/list')
    .then(function (result) {
      var costs = result.costs.cost;
      var promises = [];
      for (var index = 0; index < costs.length; index++) {
        promises.push(Hoist.event.raise('cost:found', costs[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};