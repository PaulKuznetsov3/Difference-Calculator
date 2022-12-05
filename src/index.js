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
        let result = [];
            for (const key of sortKeys) {
                const value1 = file1parse[key];
                const value2 = file2parse[key];
            if (!_.has(file1parse, key)) {
                result.push(`+ ${key}: ${value2}`);
            } else if (!_.has(file2parse, key)) {
                result.push(`- ${key}: ${value1}`);
            } else if (value2 !== value1) {
                result.push(`- ${key}: ${value1}\n+ ${key}: ${value2}`);
            } else {
                result.push(`  ${key}: ${value1}`);
            }
    } 
    
            return `{\n${result.join('\n')}\n}`;
   
};

export default genDiff;