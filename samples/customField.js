/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var wfm = Hoist.connector('<key>');
  wfm.get('/customfield.api/definition')
    .then(function (result) {
      var customFieldDefinitions = result.customFieldDefinitions.customFieldDefinition;
      var promises = [];
      for (var index = 0; index < customFieldDefinitions.length; index++) {
        promises.push(Hoist.event.raise('customFieldDefinition:found', customFieldDefinitions[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);

};