import _ from 'lodash';

const makeIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);

const stringify = (value, depth = 1) => {
  
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }
  
  const massValue = Object.entries(value);
  const lines = massValue.map(([key, val]) => {
      return `${makeIndent(depth)}${key}: ${stringify(val, depth + 1)}`;
    })
    const result = ['{', ...lines, `${makeIndent(depth)}`, `}`].join('\n');
    
    return result;
};

const getTree = (tree ) => {
  console.log('Tree: ',tree)
  
const iter = (value, depth) => {
  console.log('value: ',value)
  const lines = value.map((obj) => {
    const {key, type, children, value, valueAfter, valueBefore} = obj;
   
    switch (type) {
      case 'added':
        return `${makeIndent(depth)}+ ${key}}: ${stringify(value, depth + 1)}`; 
      case 'deleted':
        return `${makeIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`; 
        case 'nested':
          return `${makeIndent(depth)}  ${key}: {\n${(iter(children, depth + 1))}\n${makeIndent(depth)}}`;
      case  'changed':
        return `${makeIndent(depth)}- ${key}: ${stringify(valueBefore, depth + 1 )}\n${makeIndent(depth )}+ ${key}: ${stringify(valueAfter, depth + 1)}`;
      case 'unchanged':
       return `${makeIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`; 
      default :
      return 'unknown type'
    }
  });

  return ['{', ...lines, `${makeIndent(depth)}}`].join('\n');

}

  return iter(tree, 1)
  
};

  export default getTree;