const {
  createComponentsModuleIdFactory,
  processComponentsModuleFilter,
} = require('./compile/metro-base');

module.exports = {
  serializer: {
    createModuleIdFactory: createComponentsModuleIdFactory,
    processModuleFilter: processComponentsModuleFilter(),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
