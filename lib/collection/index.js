var assign = require('lodash.assign');
var arraywrap = require('arraywrap');
var guid = require('cuid');
var noop = require('nop');
var async = require('async');

var BlockArray = require('./blockarray');

function Collection(options) {
  options = options || {};

  if (!options.store) {
    throw new Error('Collection must be created with a store');
  }
  this._store = options.store;

  if (!options.name) {
    throw new Error('Collection must be created with a name');
  }
  // TODO: check name for block separator
  this._name = options.name;

  var blocks = {};
  arraywrap(options.indexOn || []).forEach(function (key) {
    blocks[key] = new BlockArray({
      collectionName: options.name,
      keyName: key,
      blockSize: options.blockSize
    });
  });
  this._blocks = blocks;
}

assign(Collection.prototype, {
  add: function add(elements, callback) {
    var me = this;

    callback = callback || noop;

    var setOptions = {};
    arraywrap(elements).forEach(function (element) {
      setOptions[guid()] = element;
    });

    async.parallel([
      function (done) { me._store.set(setOptions, done); },
      function (done) {
        // TODO: add to all relevant blocks
      }
    ], function (err) {
      if (err) {
        async.parallel([
          function (done) { me._store.remove(Object.keys(setOptions), done); },
          function (done) {
            // TODO: remove from all relevant blocks
          }
        ], callback);
      } else {
        callback(null);
      }
    });

  }
});

module.exports = Collection;
