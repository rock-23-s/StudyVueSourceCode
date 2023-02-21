const path = require('path')
const alias = require('@rollup/plugin-alias')
const ts = require('rollup-plugin-typescript2')
const node = require('@rollup/plugin-node-resolve').nodeResolve



const resolve = p => {
  return path.resolve(__dirname, '../', p)
}
const version = process.env.VERSION || require('../package.json').version
const banner =
  '/*!\n' +
  ` * Vue.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Evan You\n` +
  ' * Released under the MIT License.\n' +
  ' */'
console.log(banner, '--------banner')
const builds = {
  "rollup_build": {
    entry: resolve('src/main.ts'),
    dest: resolve('dist/mainTest.min.js'),
    format: 'umd',
    env: 'devlopment',
    alias: { he: './entity-decoder' },
    banner,
    plugins: [node()]
  }
}

// 因为要打包成不同功能的js文件，所以在这里其实封装成了一个公共的打包文件
function getConfig (name) {
  const opts = builds[name]
  const isTargetingBrowser = !(
    opts.transpile === false || opts.format === 'cjs'
  )
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      alias({
        entries: Object.assign({}, opts.alias)
      }),
      ts({
        compilerOptions: {             //从文件中加载任何内容
          target: isTargetingBrowser ? 'es5' : 'es2017' // 为发出的 JavaScript 设置 JavaScript 语言版本并包含兼容的库声明。
        },
        exclude: ['test', 'test-dts'], //它指定构建中插件应该忽略的文件
        include: ['src'], //指定插件应该操作的构建中的文件
        // include: isTargetingBrowser ? ['src'] : ['src', 'packages/*/src'], //指定插件应该操作的构建中的文件
      })
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'CopyVue',
      exports: 'auto',
      
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  };
  return config
}
module.exports = getConfig(process.env.TARGET)
