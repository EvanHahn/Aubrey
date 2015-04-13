const PREFIX = '#';
const SEPARATOR = '===';

export default function keyFor(collection, key, number) {
  let result = (
    PREFIX + collection +
    SEPARATOR + key
  );
  if (arguments.length === 3) {
    result += SEPARATOR + number;
  }
  return result;
};
