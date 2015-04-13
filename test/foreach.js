var expect = require('expect.js');
var sinon = require('sinon');

var createCollection = require('./helpers/create-collection');

describe('forEach', function () {
  beforeEach(function () {
    this.collection = createCollection();
  });

  it('can iterate over an empty collection', function (done) {
    var fn = sinon.spy();
    this.collection.forEach(fn);
    setTimeout(function () {
      expect(fn.called).to.be(false);
      done();
    }, 100);
  });
});
