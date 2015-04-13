const assign = require('lodash.assign');
const arraywrap = require('arraywrap');
const guid = require('cuid');
const noop = require('nop');
const async = require('async');

const BlockArray = require('./blockarray');
const keyFor = require('./keyfor');

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

    let blocks = {};
    const blockOptions = {
      store: this._store,
      collectionName: this._name,
      blockSize: options.blockSize
    };
    /*
    arraywrap(options.indexOn || []).forEach(keyName => {
      blocks[keyName] = new BlockArray(assign({}, blockOptions, { keyName }));
    });
    this._blocks = blocks;
    */

    // TODO: protect against properties named "guid"
    this._listBlock = new BlockArray(assign({}, blockOptions, { keyName: 'GUID' }));
  }

  add(elements, callback = noop) {
    elements = arraywrap(elements);

    let setOptions = {};
    const toAdd = elements.map(element => {
      const id = guid();
      setOptions[keyFor(this.name, 'GUID', id)] = element;
      return { id, value: element };
    });

    async.parallel([
      done => { this._store.set(setOptions, done); },
      done => { this._listBlock.add(toAdd, done); }
    ], function (err) {
      // TODO: error on insertion! roll back
      callback(err);
    });
  }

}
