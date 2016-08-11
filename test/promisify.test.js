import fs from 'fs';
import test from 'ava';

import { AsyncClass1, FileReader } from './asyncclass-compiled.js';

const expected = fs.readFileSync('./sample.txt', 'utf8');

test.cb('should promisify a class method and return successful result - callback', t => {
  const ac = new AsyncClass1();
  ac.uppercase('foo', (err, res) => {
    t.ifError(err);
    t.is(res, 'FOO');
    t.end();
  });
});

test.cb('should promisify a class method and return error - callback', t => {
  const ac = new AsyncClass1();
  ac.uppercase('error', (err, res) => {
    t.truthy(err);
    t.falsy(res);
    t.end();
  });
});

test.cb('should promisify a class method and return success value - promised using then()', t => {
  const ac = new AsyncClass1();
  ac.uppercase('foo').then(res => {
    t.is(res, 'FOO');
    t.end();
  });
});

test.cb('should promisify a class method and return error value - promised using then()', t => {
  const ac = new AsyncClass1();
  ac.uppercase('error').then(res => {
    t.falsy(res);
  }).catch(err => {
    t.truthy(err);
    t.end();
  });
});

test('should promisify a class method and return success value - promised', async t => {
  t.plan(1);
  const ac = new AsyncClass1();
  const res = await ac.uppercase('foo');
  t.is(res, 'FOO');
});

test('should promisify a class method and return error value - promised', async t => {
  const ac = new AsyncClass1();
  t.throws(ac.uppercase('error'));
});

test.cb('should promisify a class and return successful result - callback', t => {
  const ac = new FileReader();
  ac.uppercase('foo', (err, res) => {
    t.ifError(err);
    t.is(res, 'FOO');
    t.end();
  });
});

test.cb('should promisify a class and return error - callback', t => {
  const ac = new FileReader();
  ac.uppercase('error', (err, res) => {
    t.truthy(err);
    t.falsy(res);
    t.end();
  });
});

test.cb('should promisify a class and return success value - promised using then()', t => {
  const ac = new FileReader();
  ac.uppercase('foo').then(res => {
    t.is(res, 'FOO');
    t.end();
  });
});

test.cb('should promisify a class and return error value - promised using then()', t => {
  const ac = new FileReader();
  ac.uppercase('error').then(res => {
    t.falsy(res);
  }).catch(err => {
    t.truthy(err);
    t.end();
  });
});

test('should promisify a class and return success value - promised', async t => {
  t.plan(1);
  const ac = new FileReader();
  const res = await ac.uppercase('foo');
  t.is(res, 'FOO');
});

test('should promisify a class and return error value - promised', async t => {
  const ac = new FileReader();
  t.throws(ac.uppercase('error'));
});

test('should promisify a class and read the file - promised', async t => {
  t.plan(1);
  const f = new FileReader();
  const actual = await f.readFile('./sample.txt');
  t.is(actual, expected);
});

test.cb('should promisify a class and read the file - callback', t => {
  const f = new FileReader();
  f.readFile('./sample.txt', (err, res) => {
    t.falsy(err);
    t.is(res, expected);
    t.end();
  });
});

test.cb('should promisify a class and read the file - promised using then()', t => {
  const f = new FileReader();
  f.readFile('./sample.txt').then(res => {
    t.is(res, expected);
    t.end();
  });
});
