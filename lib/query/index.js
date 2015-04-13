export default class Query {

  constructor(collection) {
    this.collection = collection;
  }

  where(key, operator, value) {
    return this;
  }

  limit(count) {
    return this;
  }

  find(callback) {
    this.collection.toArray(function (err, arr) {
      if (err) { return callback(err); }
      callback(null, arr);
    });
  }

}
