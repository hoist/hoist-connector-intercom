/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/category.api/list')
    .then(function (categories) {
      var promises = [];
      for (var index = 0; index < categories.length; index++) {
        promises.push(Hoist.event.raise('category:found', categories[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};