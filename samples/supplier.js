/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/supplier.api/current')
    .then(function (result) {
      var suppliers = result.suppliers.supplier;
      var promises = [];
      for (var index = 0; index < suppliers.length; index++) {
        promises.push(Hoist.event.raise('supplier:found', suppliers[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};