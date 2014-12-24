/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/purchaseorder.api/current')
    .then(function (result) {
      var purchaseorders = result.purchaseorders.purchaseorder;
      var promises = [];
      for (var index = 0; index < purchaseOrders.length; index++) {
        promises.push(Hoist.event.raise('purchaseOrder:found', purchaseOrders[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};