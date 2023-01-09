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
      switch (obj.type) {
        case 'unchanged':
          return [];
        case 'added':
          return `Property '${getPath(path, obj.key)}' was added with value: ${stringify(obj.value)}`;
        case 'deleted':
          return `Property '${getPath(path, obj.key)}' was removed`;
        case 'nested':
          return `${iter(obj.children, [getPath(path, obj.key)])}`;
        case 'changed':
          return `Property '${getPath(path, obj.key)}' was updated. From ${stringify(obj.value1)} to ${stringify(obj.value2)}`;
        default:
          throw new Error(`unknown format: '${obj.type}'!`);
      }
    });
    return `${lines.join('\n')}`;
  };
  return iter(tree);
};
export default plain;
