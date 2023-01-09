import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync((getFixturePath(filepath)), 'utf-8');

const expected = (format) => readFile(`${format}.txt`);

describe.each([
  ['json'],
  ['yaml'],
  ['yml'],
])('extension %s', (extension) => {
  test.each([
    ['stylish'],
    ['plain'],
    ['json'],
  ])('format %s', (format) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);

    expect(genDiff(filepath1, filepath2, format)).toEqual(expected(format));
  });
});
