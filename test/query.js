const expect = require('expect.js');

const aubrey = require('..');
const createCollection = require('./helpers/create-collection');

describe.skip('query', function () {
  beforeEach(function (done) {
    this.collection = createCollection();
    this.query = aubrey.query(this.collection);

    this.people = [
      { first: 'Ron', last: 'Burgundy', gender: 'male', anchor: true },
      { first: 'Veronica', last: 'Corningstone', gender: 'female', anchor: true },
      { first: 'Rachel', last: 'McAdams', gender: 'female' },
      { first: 'Ryan', last: 'Gosling', gender: 'male' }
    ];

    this.collection.add(this.people, done);
  });

  it('gets all of the elements by default', function (done) {
    this.query.find((err, values) => {
      expect(values).to.eql(this.people);
      done(err);
    });
  });

  it('can limit the number of values', function (done) {
    this.query
    .limit(2)
    .find((err, values) => {
      expect(this.people).to.contain(values[0]);
      expect(this.people).to.contain(values[2]);
      done(err);
    });
  });

  it('can select a single element with one criteria', function (done) {
    this.query
    .where('first', 'equals', 'Ron')
    .find((err, values) => {
      expect(values).to.eql([this.people[0]]);
      done(err);
    });
  });

  it('can select a multiple elements with one criteria', function (done) {
    this.query
    .where('gender', 'equals', 'male')
    .find((err, values) => {
      expect(values).to.have.length(2);
      expect(values).to.contain([this.people[0]]);
      expect(values).to.contain([this.people[2]]);
      done(err);
    });
  });

  it('can select one element with multiple criteria', function (done) {
    this.query
    .where('anchor', 'equals', true)
    .where('gender', 'equals', 'female')
    .find((err, values) => {
      expect(values).to.eql([this.people[1]]);
      done(err);
    });
  });

  it('can find just one value', function (done) {
    this.query.findOne((err, value) => {
      expect(this.people).to.contain(value);
      done(err);
    });
  });

  it('can find one element matching a criteria', function (done) {
    this.query
    .where('gender', 'equals', 'male')
    .findOne((err, value) => {
      expect([this.people[0], this.people[2]]).to.contain(value);
      done(err);
    });
  });
});
