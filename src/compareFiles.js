import _ from 'lodash';

const compareFiles = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const result = sortedKeys.map((key) => {
    if (!_.has(file1, key)) {
      return {
        key,
        value: file2[key],
        type: 'added',
      };
    } if (!_.has(file2, key)) {
      return {
        key,
        value: file1[key],
        type: 'deleted',
      };
    } if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return {
        key,
        type: 'nested',
        children: compareFiles(file1[key], file2[key]),
      };
    }
    if (!_.isEqual(file2[key], file1[key])) {
      return {
        key,
        value1: file1[key],
        value2: file2[key],
        type: 'changed',
      };
    }
    return {
      key,
      value: file1[key],
      type: 'unchanged',
    };
  });

  return result;
};

export default compareFiles;
