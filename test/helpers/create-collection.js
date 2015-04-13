var aubrey = require('../..');
var ObjectStore = require('aubrey-object-store');

module.exports = function createCollection() {
  return new aubrey.Collection({
    name: 'abc',
    store: new ObjectStore()
  });
};
