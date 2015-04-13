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

    const name = options.name;
    if (!name) {
      throw new Error('Collection must be created with a name');
    } else if (name.indexOf(keyFor.separator) !== -1) {
      throw new Error('Name cannot contain ' + keyFor.separator);
    }
    this._name = options.name;

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

    this._listBlock = new BlockArray(assign({}, blockOptions, { keyName: '__aubrey_guid__' }));
  }

  add(elements, callback = noop) {
    elements = arraywrap(elements);

    let setOptions = {};
    const toAdd = elements.map(element => {
      const id = guid();
      setOptions[keyFor(this._name, id)] = element;
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

  forEach(fn, allDone = noop) {
    this._listBlock.eachBlock((block, done) => {
      const keys = block.map(blockEntry => {
        return keyFor(this._name, blockEntry.id);
      });

      this._store.get(keys, (err, result) => {
        if (err) { return done(err); }
        keys.forEach(key => {
          fn(result[key]);
        });
        done(null);
      });
    }, allDone);
  }

  toArray(callback) {
    const result = [];
    this.forEach(function (value) {
      result.push(value);
    }, function (err) {
      callback(err, result);
    });
  }

}
