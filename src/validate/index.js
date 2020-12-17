const { validate } = require('schema-utils');
const { optionCheck, elementCheck, pathCheck } = require('./schema');

function validateOptions(options) {
  validate(optionCheck.schema, options, optionCheck.config);
  options.namespace.forEach((element) => {
    validate(elementCheck.schema, element, elementCheck.config);
    if (Array.isArray(element.path)) {
      element.path.forEach((val) => {
        validate(pathCheck.schema, val, pathCheck.config);
      });
    }
  });
}

module.exports = validateOptions;
