import fs from 'fs';
import promisify from '../';

export class AsyncClass1 {
  @promisify
  uppercase(param, fn) {
    return setTimeout(() => {
      if (param.toLowerCase() === 'error') {
        return fn(new Error(param));
      }
      return fn(null, param.toUpperCase());
    }, 50);
  }
}

@promisify
export class FileReader {
  uppercase(param, fn) {
    return setTimeout(() => {
      if (param.toLowerCase() === 'error') {
        return fn(new Error(param));
      }
      return fn(null, param.toUpperCase());
    }, 50);
  }

  readFile(path, fn) {
    return fs.readFile(path, 'utf8', fn);
  }
}
