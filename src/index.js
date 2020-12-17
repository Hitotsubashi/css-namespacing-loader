const loaderUtils = require('loader-utils');
const namespacing = require('css-namespacing');
const validateOptions = require('./validate');

const isString = function isString(val) {
  return typeof val === 'string';
};

const isRegExp = function isRegExp(val) {
  return val instanceof RegExp;
};

const getOptions = function getOptions() {
  const options = loaderUtils.getOptions(this);
  return options;
};

const getPrefix = function getPrefix(resourcePath, namespace) {
  let prefix;
  for (let i = 0; i < namespace.length; i += 1) {
    const element = namespace[i];
    const { path, value } = element;
    if (isString(path) && resourcePath === path) {
      return value;
    }
    if (isRegExp(path) && path.test(resourcePath)) {
      return value;
    }
    if (Array.isArray(path)) {
      for (let index = 0; index < path.length; index += 1) {
        if (isString(path[index]) && resourcePath === path[index]) {
          return value;
        }
        if (isRegExp(path[index]) && path[index].test(resourcePath)) {
          return value;
        }
      }
    }
    if (path === undefined) {
      prefix = value;
    }
  }
  return prefix;
};

const loader = function loader(source) {
  const { resourcePath } = this;
  const options = getOptions.call(this);
  validateOptions(options);
  const { namespace } = options;
  const prefix = getPrefix(resourcePath, namespace);
  if (prefix) {
    return namespacing(source, prefix);
  }
  return source;
};

module.exports = loader;
