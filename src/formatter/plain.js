import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return String(data);
};

const getPath = (valuePath, key) => [...valuePath, key].join('.');

const plain = (tree) => {
  const iter = (node, path = []) => {
    const lines = node.flatMap((obj) => {
      const {
        key, type, children, value, value1, value2,
      } = obj;
      switch (type) {
        case 'unchanged':
          return [];
        case 'added':
          return `Property '${getPath(path, key)}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${getPath(path, key)}' was removed`;
        case 'nested':
          return `${iter(children, [getPath(path, key)])}`;
        case 'changed':
          return `Property '${getPath(path, key)}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        default:
          throw new Error(`unknown format: '${type}'!`);
      }
    });
    return `${lines.join('\n')}`;
  };
  return iter(tree);
};
export default plain;
