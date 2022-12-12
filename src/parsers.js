import yaml from 'js-yaml';

const getFormat = (file, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.load(file);
    case '.yaml':
      return yaml.load(file);
    default:
      return ['unknown format unknown file format'];
  }
};

export default getFormat;
