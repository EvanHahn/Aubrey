const arraywrap = require('arraywrap');
const guid = require('cuid');
const noop = require('nop');
const async = require('async');

const BlockArray = require('./blockarray');

export default class Collection {

  constructor(options = {}) {
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
    arraywrap(options.indexOn || []).forEach(key => {
      blocks[key] = new BlockArray({
        collectionName: options.name,
        keyName: key,
        blockSize: options.blockSize
      });
    });
    this._blocks = blocks;
  }

  add(elements, callback = noop) {
    var setOptions = {};
    arraywrap(elements).forEach(element => {
      setOptions[guid()] = element;
    });

    async.parallel([
      done => { this._store.set(setOptions, done); },
      function (done) {
        // TODO: add to all relevant blocks
      }
    ], function (err) {
      // TODO
      // error inserting!! roll back
      callback(err);
    });
  }

}
