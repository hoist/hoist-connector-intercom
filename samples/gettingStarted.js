/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var intercom = Hoist.connector('<key>');
  intercom.get('/contact', {emailAddress: 'test@test.com'})
    .then(function (result) {
      return Hoist.log(result);
    })
    .then(done);

};