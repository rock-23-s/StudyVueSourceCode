const featureFlags = require('../../scripts/feature-flags.js')
process.env.CHROME_BIN = require('puppeteer').executablePath()

const define = {
  __DEV__: true,
  "process.env.CI": !!process.env.CI
}

for(const key in featureFlags) {
  define[`process.env.${key}`] = featureFlags[key]
}

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: ['*.spec.ts'],
    preprocessors: { // 预处理器
      '*.spec.ts': ['esbuild']
    },
    esbuild: {
      define
    },
    browsers: ["ChromeHeadless"],
    plugins: ["karma-jasmine", "karma-esbuild", "karma-chrome-launcher"],
    singleRun: true
  })
}

