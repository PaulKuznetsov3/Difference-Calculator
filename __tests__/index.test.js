import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import expected from '../__fixtures__/expected.js';
import expected2 from '../__fixtures__/expected2.js';
import expected3 from '../__fixtures__/expected3.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fileFormats = ['json', 'yaml', 'yml'];

describe('gendiff', () => {
  test.each(fileFormats)('gendiff %s', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);

    expect(genDiff(filepath1, filepath2)).toEqual(expected);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expected);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expected2);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expected3);
  });
});
