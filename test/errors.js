var expect = require('expect.js');

var aubrey = require('..');

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
  });
});
