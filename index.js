const Collection = require('./lib/collection');
const Query = require('./lib/query');

function query(collection) {
  return new Query(collection);
}

module.exports = { Collection, query };
