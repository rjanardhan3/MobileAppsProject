const { getDefaultConfig } = require("@expo/metro-config");
const blacklist = require('metro-config/src/defaults/exclusionList');
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    assetExts: ['bin', 'txt', 'jpg', 'ttf', 'png'],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    blacklistRE: blacklist([/platform_node/])
  },
};

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
