const assign = require('lodash.assign');
const async = require('async');

const keyFor = require('../keyfor');

export default class BlockArray {

  constructor(options) {
    this.store = options.store;
    this.collectionName = options.collectionName;
    this.keyName = options.keyName;
    this.blockSize = options.blockSize || 10;

    this.length = 0;
  }

  add(elements, callback) {
    const toAdd = elements.map(element => {
      let result = { id: element.id };
      const value = element.value[this.keyName];
      if (value) { result.value = value; }
      return result;
    });

    const length = this.length;
    const overwriteAmount = this.blockSize - (length % this.blockSize);

    this.length += toAdd.length;

    async.parallel([

      done => {
        const blockToOverwrite = this.blockAtIndex(length);
        const keyToOverwrite = this.keyFor(blockToOverwrite);
        this.store.get([keyToOverwrite], (err, result) => {
          if (err) { return done(err); }
          const block = result[keyToOverwrite];
          const newBlock = (block || []).concat(toAdd.slice(0, overwriteAmount));
          done(null, { [keyToOverwrite]: newBlock });
        });
      },

      done => {
        let result;
        for (let i = overwriteAmount; i < toAdd.length; i += this.blockSize) {
          const key = this.keyFor(this.blockAtIndex(i));
          const value = toAdd.slice(i, this.blockSize);
          result[key] = value;
        }
        done(null, result);
      }

    ], (err, results) => {
      if (err) { return callback(err); }
      const setOptions = assign.apply(null, results);
      this.store.set(setOptions, callback);
    });
  }

  blockAtIndex(n) {
    return Math.floor(n / this.blockSize);
  }

  keyFor(number) {
    return keyFor(this.collectionName, this.keyName, 'block' + number);
  }

}
