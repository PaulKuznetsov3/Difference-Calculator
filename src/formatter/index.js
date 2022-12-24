import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (compare, format) => {
  switch (format) {
    case 'stylish':
      return stylish(compare);
    case 'plain':
      return plain(compare);
    case 'json':
      return json(compare);
    default:
      return 'unknown type';
  }
};
export default formatter;
