const { validate } = require('schema-utils');
const {
  optionCheck, elementCheck, pathCheck, notCheck, onlyCheck,
} = require('./schema');

function validateOptions(options) {
  validate(optionCheck.schema, options, optionCheck.config);
  options.namespace.forEach((element) => {
    validate(elementCheck.schema, element, elementCheck.config);
    if (Array.isArray(element.path)) {
      element.path.forEach((val) => {
        validate(pathCheck.schema, val, pathCheck.config);
      });
    }
    if (Array.isArray(element.only)) {
      element.only.forEach((val) => {
        validate(onlyCheck.schema, val, onlyCheck.config);
      });
    }
    if (Array.isArray(element.not)) {
      element.not.forEach((val) => {
        validate(notCheck.schema, val, notCheck.config);
      });
    }
  });
}

module.exports = validateOptions;
