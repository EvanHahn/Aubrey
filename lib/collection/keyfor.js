const PREFIX = '#';
const SEPARATOR = '===';

export default function keyFor(collection, key, number) {
  return (
    PREFIX + collection +
    SEPARATOR + key +
    SEPARATOR + number
  );
};
