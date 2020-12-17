const elementCheck = {
  schema: {
    type: 'object',
    properties: {
      value: {
        type: 'string',
      },
      path: {
        anyOf: [
          { type: 'string' },
          { instanceof: 'RegExp' },
          { type: 'array' },
        ],
      },
      exclude: {
        anyOf: [
          { type: 'string' },
          { type: 'array' },
        ],
      },
    },
    additionalProperties: false,
  },
  config: {
    name: 'element in array "namespace"',
    baseDataPath: 'element',
  },
};

const optionCheck = {
  schema: {
    type: 'object',
    properties: {
      namespace: {
        instanceof: 'Array',
      },
    },
  },
  config: {
    name: 'options',
    baseDataPath: 'options',
  },
};

const pathCheck = {
  schema: {
    anyOf: [
      { type: 'string' },
      { instanceof: 'RegExp' },
    ],
  },
  config: {
    name: 'path',
    baseDataPath: 'path',
  },
};

exports.optionCheck = optionCheck;
exports.elementCheck = elementCheck;
exports.pathCheck = pathCheck;
