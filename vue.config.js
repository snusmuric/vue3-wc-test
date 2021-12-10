console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`);
const production = process.env.NODE_ENV === "production";

const config = production
  ? {
      css: {
        extract: true,
      },
      filenameHashing: false,
      chainWebpack: (config) => {
        config.optimization.splitChunks(false);
      },
    }
  : {};

module.exports = {
  ...config,
};
