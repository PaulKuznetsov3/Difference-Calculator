import _ from 'lodash';

const makeIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);
const stringify = (value, depth) => {
  
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }
  
  const massValue = Object.entries(value);
  const lines = massValue.map(([key, val]) => {
      return `${makeIndent(depth + 1)}${key}: ${iter(val, depth + 1)}`;
    })
    const result = ['{', ...lines, `${makeIndent(depth)}`, `}`].join('\n');
    
    return result;
};

const getTree = (ast ) => {
  console.log('Ast: ',ast)
const iter = (curAst, depth ) => {
  console.log('curAst: ',curAst)
  const lines = curAst.map((obj) => {
    const {key, type, children, value, valueAfter, valueBefore} = obj;
   
    switch (type) {
      case 'added':
        return `${makeIndent(depth)}+ ${key}}: ${stringify(value, depth + 1)}`; 
      case 'deleted':
        return `${makeIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`; 
        case 'nested':
          return `${makeIndent(depth)}  ${key}: {\n${stringify(iter(children, depth + 1))}\n${makeIndent(depth)}}`;
      case  'changed':
        return `${makeIndent(depth)}- ${key}: ${stringify(valueBefore, depth + 1 )}\n${makeIndent(depth + 1)}+ ${key}: ${stringify(valueAfter, depth)}`;
      case 'unchanged':
       return `${makeIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`; 
      default :
      return 'unknown type'
    }
  });

  return ['{', ...lines, `${makeIndent(depth)}}`].join('\n');

}

  return iter(ast, 1)
  
};


/*const stringify = (value) => {
  const iter = (carrentValue, depth) => {
    if (typeof carrentValue !== 'object' || carrentValue === null) {
      return String(carrentValue);
    }

    const massValue = Object.entries(carrentValue);
    const lines = massValue.map(([key, val]) => {
        return `${makeIndent(depth )}${key}: ${iter(val, depth + 1)}`;
      })
      const result = ['{', ...lines, `${makeIndent(depth )}}`].join('\n');
      
      return result;

  }
  return iter(value, 1);
};

const getTree = (ast, depth = 1) => {
 // console.log('ast: ', ast)
    
     const lines = ast.map((obj) => {
      console.log('obj: ', obj)
     
      const {key, type, children, value, valueAfter, valueBefore} = obj;

        //console.log('key: ', key)

      //  console.log('key: ', key)
        //console.log('type: ', type)
        switch (type) {
          case 'added':
            return `${makeIndent(depth + 1)}+ ${key}: ${stringify(value, depth)}`; 
          case 'deleted':
            return `${makeIndent(depth + 1 )}- ${key}: ${stringify(value, depth)}`; 
          case 'nested' :
            return `${makeIndent(depth)}  ${key}: ${(stringify(children, depth + 1))}\n${makeIndent(depth)}`;
          case  'changed':
            return `${makeIndent(depth + 1)}- ${key}: ${stringify(valueBefore, depth)}\n${makeIndent(depth + 1)}+ ${key}: ${stringify(valueAfter, depth)}`;
          case 'unchanged':
           return `${makeIndent(depth + 1)}  ${key}: ${stringify(value, depth)}`; 
          default :
          return 'unknown type'
        }
      });
      return ['{', ...lines, `${makeIndent(depth)}}`].join('\n');
      
    
};*/

  export default getTree;