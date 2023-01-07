import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (compare, format) => {
  switch (format) {
    case 'stylish':
      return stylish(compare);
    case 'plain':
      return plain(compare);
    case 'json':
      return json(compare);
    default:
      throw new Error(`unknown format: '${format}'!`);
  }
};
export default getFormatter;
