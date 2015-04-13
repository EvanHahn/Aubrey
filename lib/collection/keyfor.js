export default function keyFor(collection, key, number) {
  const separator = keyFor.separator;
  let result = collection + separator + key;
  if (arguments.length === 3) {
    result += separator + number;
  }
  return result;
};

keyFor.separator = '===';
