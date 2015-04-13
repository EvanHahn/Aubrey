const SEPARATOR = '===';

export default function keyFor(collection, key, number) {
  let result = collection + SEPARATOR + key;
  if (arguments.length === 3) {
    result += SEPARATOR + number;
  }
  return result;
};
