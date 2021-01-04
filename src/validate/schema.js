exports.elementCheck = {
  schema: {
    type: 'object',
    properties: {
      value: {
        type: 'string',
      },
      path: {
        instanceof: 'Array',
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

exports.optionCheck = {
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

exports.pathCheck = {
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

exports.notCheck = {
  schema: {
    instanceof: 'RegExp',
  },
  config: {
    name: 'not',
    baseDataPath: 'not',
  },
};

exports.onlyCheck = {
  schema: {
    instanceof: 'RegExp',
  },
  config: {
    name: 'only',
    baseDataPath: 'only',
  },
};
