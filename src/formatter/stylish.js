import _ from 'lodash';

const makeIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const makeBackIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const massValue = Object.entries(value);
  const lines = massValue.map(([key, val]) => `${makeIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  const result = lines.join('\n');

  return `{\n${result}\n${makeBackIndent(depth - 1)}}`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const lines = node.map((obj) => {
      switch (obj.type) {
        case 'added':
          return `${makeIndent(depth)}+ ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'deleted':
          return `${makeIndent(depth)}- ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'nested':
          return `${makeIndent(depth)}  ${obj.key}: {\n${(iter(obj.children, depth + 1))}\n${makeBackIndent(depth)}}`;
        case 'changed':
          return `${makeIndent(depth)}- ${obj.key}: ${stringify(obj.value1, depth + 1)}\n${makeIndent(depth)}+ ${obj.key}: ${stringify(obj.value2, depth + 1)}`;
        case 'unchanged':
          return `${makeIndent(depth)}  ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        default:
          throw new Error(`unknown format: '${obj.type}'!`);
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
