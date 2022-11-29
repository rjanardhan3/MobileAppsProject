const { getDefaultConfig } = require("@expo/metro-config");
module.exports = (async () => {
  const defaultConfig= await defaultConfig();
  const { assetExs } = defaultConfig.resolver;
  return {
    resolver: {
      assetExs: [...assetExs, 'bin']
    }

  }
})

//const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
