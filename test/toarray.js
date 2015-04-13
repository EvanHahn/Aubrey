const expect = require('expect.js');
const sinon = require('sinon');
const cuid = require('cuid');

const createCollection = require('./helpers/create-collection');

describe('toArray', function () {
  beforeEach(function () {
    this.collection = createCollection();
  });

  it('converts to an empty array', function (done) {
    this.collection.toArray(function (err, arr) {
      expect(arr).to.eql([]);
      done(err);
    });
  });

  it('converts to an array with 1 element', function (done) {
    this.collection.add('what the heck', err => {
      if (err) { return done(err); }

      this.collection.toArray(function (err, arr) {
        expect(arr).to.eql(['what the heck']);
        done(err);
      });
    });
  });

  it('converts to an array with many elements', function (done) {
    let strings = [];
    for (let i = 0; i < 50; i++) {
      strings.push(cuid());
    }

    this.collection.add(strings, err => {
      if (err) { return done(err); }

      this.collection.toArray(function (err, arr) {
        expect(arr.sort()).to.eql(strings.sort());
        done(err);
      });
    });
  });
});
