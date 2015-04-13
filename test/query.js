const expect = require('expect.js');

const aubrey = require('..');
const createCollection = require('./helpers/create-collection');

describe('query', function () {
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
    this.query.exec((err, values) => {
      expect(values).to.eql(this.people);
      done(err);
    });
  });
});
