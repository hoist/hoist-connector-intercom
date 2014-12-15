/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/template.api/list')
    .then(function (templates) {
      var promises = [];
      for (var index = 0; index < templates.length; index++) {
        promises.push(Hoist.event.raise('template:found', templates[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};