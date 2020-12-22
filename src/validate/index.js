const { validate } = require('schema-utils');
const {
  optionCheck, elementCheck, pathCheck, notCheck, onlyCheck,
} = require('./schema');

function validateOptions(options) {
  validate(optionCheck.schema, options, optionCheck.config);
  options.namespace.forEach((element) => {
    validate(elementCheck.schema, element, elementCheck.config);
    const { path, not, only } = element;
    if (Array.isArray(path)) {
      path.forEach((val) => {
        validate(pathCheck.schema, val, pathCheck.config);
      });
    }
    if (not) {
      validate(notCheck.schema, not, notCheck.config);
    }
    if (only) {
      validate(onlyCheck.schema, only, onlyCheck.config);
    }
  });
}

module.exports = validateOptions;
