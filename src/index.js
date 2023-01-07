#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import compareFiles from './compareFiles.js';
import getFormatter from './formatter/index.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync((getPath(filepath)), 'utf-8');
const format = (data) => path.extname(data).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const format1 = format(filepath1);
  const format2 = format(filepath2);
  const data1 = parse(file1, format1);
  const data2 = parse(file2, format2);
  const compare = compareFiles(data1, data2);
  return getFormatter(compare, formatName);
};

export default genDiff;
