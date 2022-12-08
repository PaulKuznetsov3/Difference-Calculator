#!/usr/bin/env node
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync((getPath(filepath)), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const file1parse = JSON.parse(file1);
  const file2parse = JSON.parse(file2);
  const keys = Object.keys({ ...file1parse, ...file2parse });
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.map((key) => {
    const value1 = file1parse[key];
    const value2 = file2parse[key];
    if (!_.has(file1parse, key)) {
      return (`+ ${key}: ${value2}`);
    } if (!_.has(file2parse, key)) {
      return (`- ${key}: ${value1}`);
    } if (value2 !== value1) {
      return (`- ${key}: ${value1}\n+ ${key}: ${value2}`);
    }
    return (`  ${key}: ${value1}`);
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
