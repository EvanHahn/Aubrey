export default class Query {

  constructor(collection) {
    this.collection = collection;
  }

  exec(callback) {
    this.collection.toArray(function (err, arr) {
      if (err) { return callback(err); }
      callback(null, arr);
    });
  }

}
