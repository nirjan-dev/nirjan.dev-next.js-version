const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();
const withTM = require("next-transpile-modules")(["ui"]);

const config = {
  reactStrictMode: true,
};

module.exports = withVanillaExtract(withTM(config));
