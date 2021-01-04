const { validate } = require('schema-utils');
const {
  optionCheck, elementCheck, pathCheck, notCheck, onlyCheck,
} = require('./schema');

function validateOptions(options) {
  validate(optionCheck.schema, options, optionCheck.config);
  options.namespace.forEach((element) => {
    validate(elementCheck.schema, element, elementCheck.config);
    element.path.forEach((val) => {
      validate(pathCheck.schema, val, pathCheck.config);
    });
    element.only.forEach((val) => {
      validate(onlyCheck.schema, val, onlyCheck.config);
    });
    element.not.forEach((val) => {
      validate(notCheck.schema, val, notCheck.config);
    });
  });
}

module.exports = validateOptions;
