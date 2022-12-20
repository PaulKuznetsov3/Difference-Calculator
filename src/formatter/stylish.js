const makeIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const makeBackIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
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
      const {
        key, type, children, value, valueAfter, valueBefore,
      } = obj;

      switch (type) {
        case 'added':
          return `${makeIndent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${makeIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        case 'nested':
          return `${makeIndent(depth)}  ${key}: {\n${(iter(children, depth + 1))}\n${makeBackIndent(depth)}}`;
        case 'changed':
          return `${makeIndent(depth)}- ${key}: ${stringify(valueBefore, depth + 1)}\n${makeIndent(depth)}+ ${key}: ${stringify(valueAfter, depth + 1)}`;
        case 'unchanged':
          return `${makeIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
        default:
          return 'unknown type';
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
