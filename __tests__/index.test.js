import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import expected from '../__fixtures__/expected.js';
import expected1 from '../__fixtures__/expected1.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'))).toEqual(expected);
  expect(genDiff(getFixturePath('file.txt'), getFixturePath('file2.yaml'))).toEqual(expected1);
});
