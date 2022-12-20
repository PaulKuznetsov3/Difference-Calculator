import stylish from './stylish.js';

const formatter = (compare, format) => {
  switch (format) {
    case 'stylish':
      return stylish(compare);
    default:
      return 'unknown type';
  }
};
export default formatter;
