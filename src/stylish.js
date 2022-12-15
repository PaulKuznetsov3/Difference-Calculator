import _ from 'lodash';


const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (carrentValue, depth) => {
    if (typeof carrentValue !== 'object' || carrentValue === null) {
      return String(carrentValue);
    }
    
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const massValue = Object.entries(carrentValue);
    const lines = massValue.map(([key, val]) => {
        return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
      })
      const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
      
      return result;

  }
  return iter(value, 1);
};

const getTree = (ast) => {
    const massValue = Object.entries(ast);
     const lines = massValue.map((obj) => {
        const {name, type, children, value, valueAfter, valueBefore} = obj;
        switch (type) {
          case 'added':
            return `+ ${name}: ${stringify(value)}`; 
          case 'deleted':
            return `- ${name}: ${stringify(value)}`; 
          case 'nested' :
            return `  ${name}: ${stringify(children, depth + 1)}`;
          case  'changed':
            return `- ${name}: ${stringify(valueBefore)}\n + ${name}: ${stringify(valueAfter)}`;
          case 'unchanged':
           return `  ${name}: ${stringify(value)}`; 
          default :
          return 'unknown type'
        }
      });
      return ['{', ...lines, `}`].join('\n');
    
};

  export default getTree;