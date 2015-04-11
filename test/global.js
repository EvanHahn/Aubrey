var Aubrey = require('..');
var ObjectStore = require('aubrey-object-store');

global.create = function create() {
  return new Aubrey({ store: new ObjectStore() });
};
