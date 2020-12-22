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
      not: {
        instanceof: 'Array',
      },
      only: {
        instanceof: 'Array',
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

const notCheck = {
  schema: {
    instanceof: 'RegExp',
  },
  config: {
    name: 'not',
    baseDataPath: 'not',
  },
};

const onlyCheck = {
  schema: {
    instanceof: 'RegExp',
  },
  config: {
    name: 'only',
    baseDataPath: 'only',
  },
};

exports.optionCheck = optionCheck;
exports.elementCheck = elementCheck;
exports.pathCheck = pathCheck;
exports.notCheck = notCheck;
exports.onlyCheck = onlyCheck;
