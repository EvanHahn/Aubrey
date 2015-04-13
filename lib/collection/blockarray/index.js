var assign = require('lodash.assign');

function BlockArray(options) {
  this.collectionName = options.collectionName;
  this.keyName = options.keyName;
  this.blockSize = options.blockSize || 10;
  this.separator = '===';
  this.prefix = '#';
}

assign(BlockArray.prototype, {

  keyFor: function keyFor() {
  }

});

module.exports = BlockArray;
