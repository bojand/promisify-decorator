# promisify decorator

A class or method [decorator](https://github.com/wycats/javascript-decorators) which uses [promisify-call](https://github.com/bojand/promisify-call) to
promisify methods so they can be called in either callback or promise style.

As decorators are a part of future ES2016 standard they can only be used with transpilers such
as [Babel](http://babeljs.io).

#### Babel 6 Usage

The implementation of the decorator transform is currently on hold as the syntax
is not final. If you would like to use this project with Babel 6.0, you may use
[babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)
which implement Babel 5 decorator transform for Babel 6.

#### Installation

```sh
npm install promisify-decorator
```

#### Usage

Trivial example to read a file.

```js
import fs from 'fs';
import promisify from 'promisify-decorator';

export class FileReader {
  @promisify
  readFile(path, fn) {
    return fs.readFile(path, 'utf8', fn);
  }
}
```

From there we can use callback style:

```js
const f = new FileReader();
f.readFile('./sample.txt', (err, res) => {
  console.log(res);
});
```

Or we can use promises:

```js
const f = new FileReader();
const res = await f.readFile('./sample.txt');
console.log(res);
```

Similarly we can promisify a whole class including all of its methods:

```js
import fs from 'fs';
import promisify from 'promisify-decorator';

@promisify
class FileReader {
  readFile(path, fn) {
    return fs.readFile(path, 'utf8', fn);
  }
}
```

### License

Copyright 2015 Bojan D.

Licensed under the MIT License.
