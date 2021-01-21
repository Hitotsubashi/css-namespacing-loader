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

const getOption = function getOption(resourcePath, namespace) {
  const option = {};
  for (let i = 0; i < namespace.length; i += 1) {
    const element = namespace[i];
    const {
      path, value, not, only,
    } = element;
    if (Array.isArray(path)) {
      for (let index = 0; index < path.length; index += 1) {
        if (isString(path[index]) && resourcePath.includes(path[index])) {
          return { namespace: value, not, only };
        }
        if (isRegExp(path[index]) && path[index].test(resourcePath)) {
          return { namespace: value, not, only };
        }
      }
    }
    if (path === undefined) {
      option.namespace = value;
      option.not = not;
      option.only = only;
    }
  }
  return option;
};

const loader = function loader(source) {
  const { resourcePath } = this;
  const options = getOptions.call(this);
  validateOptions(options);
  const { namespace } = options;
  const option = getOption(resourcePath, namespace);
  if (option && option.namespace) {
    return namespacing(source, option);
  }
  return source;
};

module.exports = loader;
