import _ from 'lodash';

const compareFiles = (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 });
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (!_.has(file1, key)) {
      return (`+ ${key}: ${value2}`);
    } if (!_.has(file2, key)) {
      return (`- ${key}: ${value1}`);
    } if (value2 !== value1) {
      return (`- ${key}: ${value1}\n+ ${key}: ${value2}`);
    }
    return (`  ${key}: ${value1}`);
  });
  return `{\n${result.join('\n')}\n}`;
};

export default compareFiles;
