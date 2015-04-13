var expect = require('expect.js');

var aubrey = require('..');
var ObjectStore = require('aubrey-object-store');

describe('error detection', function () {
  describe('misconfiguration', function () {
    function create(opts) {
      return new aubrey.Collection(opts);
    }

    it('throws an error with an empty configuration', function () {
      expect(create).to.throwError();
    });

    it('throws an error without a store configuration', function () {
      expect(create).withArgs({}).to.throwError();
    });

    it('throws an error if the name has the separator in it', function () {
      expect(create).withArgs({
        name: 'what===the',
        store: new ObjectStore()
      }).to.throwError();
    });
  });
});
