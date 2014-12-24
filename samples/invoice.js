/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/invoice.api/current')
    .then(function (result) {
      var invoices = result.invoices.invoice;
      var promises = [];
      for (var index = 0; index < invoices.length; index++) {
        promises.push(Hoist.event.raise('invoice:found', invoices[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};