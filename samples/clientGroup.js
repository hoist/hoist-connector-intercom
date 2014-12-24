/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.post('/clientgroup.api/add', clientgroup)
    .then(function (result) {
      var clientgroup = result.clientgroup;
      return Hoist.event.raise('clientgroup:added', clientgroup, done);
    })
    .then(done);

};