const expect = require('expect.js');
const sinon = require('sinon');
const cuid = require('cuid');

const createCollection = require('./helpers/create-collection');

describe('forEach', function () {
  beforeEach(function () {
    this.collection = createCollection();
  });

  it('can iterate over an empty collection', function (done) {
    var fn = sinon.spy();

    this.collection.forEach(fn, function (err) {
      expect(fn.called).to.be(false);
      done(err);
    });
  });

  it('can iterate over a collection with 1 element', function (done) {
    this.collection.add('what the heck', err => {
      if (err) { return done(err); }

      this.collection.forEach(function (value) {
        expect(value).to.equal('what the heck');
      }, done);
    });
  });

  it('can iterate over a collection with many elements', function (done) {
    let strings = [];
    for (let i = 0; i < 50; i++) {
      strings.push(cuid());
    }

    this.collection.add(strings, err => {
      if (err) { return done(err); }

      this.collection.forEach(function (value) {
        expect(strings).to.contain(value);
      }, done);
    });

  });
});
