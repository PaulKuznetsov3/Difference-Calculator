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
    const lines = node.filter((obj) => obj.type !== 'unchanged')
      .map((obj) => {
        const {
          key, type, children, value, valueAfter, valueBefore,
        } = obj;
        switch (type) {
          case 'added':
            return `Property '${getPath(path, key)}' was added with value: ${stringify(value)}`;
          case 'deleted':
            return `Property '${getPath(path, key)}' was removed`;
          case 'nested':
            return `${iter(children, [getPath(path, key)])}`;
          case 'changed':
            return `Property '${getPath(path, key)}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`;
          default:
            return 'unknown type';
        }
      });
    return `${lines.join('\n')}`;
  };
  return iter(tree);
};
export default plain;
