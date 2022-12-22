import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (compare, format) => {
  switch (format) {
    case 'stylish':
      return stylish(compare);
    case 'plain':
      return plain(compare);
    default:
      return 'unknown type';
  }
};
export default formatter;
