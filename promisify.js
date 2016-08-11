import promisifyCall from 'promisify-call';

function promisify(...args) {
  if (args.length === 1) {
    return promisifyClass(...args);
  }
  return promisifyMethod(...args);
}

function promisifyClass(target) {
  // (Using reflect to get all keys including symbols)
  let keys;
  // Use Reflect if exists
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype);
    // use symbols if support is provided
    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(key => {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, promisifyMethod(target, key, descriptor));
    }
  });
  return target;
}

function promisifyMethod(target, key, descriptor) {
  const fn = descriptor.value;
  if (typeof fn !== 'function') {
    throw new SyntaxError(`@promisify can only be used on functions, not: ${fn}`);
  }
  return {
    ...descriptor,
    value() {
      return promisifyCall(this, fn, ...arguments);
    }
  };
}

module.exports = promisify;
