// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});
config.transformer.minifierConfig.compress.drop_console = true;
config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs", "cjs", 'json'];
module.exports = config;
