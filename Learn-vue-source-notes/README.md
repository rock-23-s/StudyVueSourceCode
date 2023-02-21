  我很好奇vuejs库的起步到运行，所以开始着手做研究，包括在研究中所遇到的问题还有解决方式我都做个笔记，怕今后忘记，我查阅了很多的资料，虽有把vue的形成写的特别好的书和文章，但是我承认我比较菜，学的慢，别人总结好的我去看完只能使我一时欢乐，并不能使我真正掌握，当我从折磨如何从头入手到钻研一条线去一步步来生成这个库我才能知道这中途所用的技术，和为什么时候这样的方式去解决，站在一个vue当时实现和思考的角度去搭建这个库，更能使我印象深刻以及技术真正的掌握，使用md，是因为它比其他一些笔记软件展示更详细，还能一眼看到文件目的整体结构介绍。我把它当成一个汽车乐高模型，经过散碎的拼凑，然后呈现一个模型展示，带着不同的问题，去查阅很多的资料，反而更能使我掌握更多的知识。

  参考文献：
    vue源码系列-vue的中文社区：https://vue-js.com/learn-vue/start/
    vue最初的原型：https://github.com/vuejs/vue/commits/0.6.0?after=218557cdec830a629252f4a9e2643973dc1f1d2d+349&branch=0.6.0&qualified_name=refs%2Ftags%2F0.6.0
    《vue.js设计与实现》
    《代码整洁之道》
    《javascript设计模式与开发实践》
    以及项目中涉及到的技术：
      package.json中的安装包，chrome查阅散碎网址等。


  ## 源码的文档详细介绍说明：

  ```bash
  ├─dist                   # 项目构建后的文件
  ├─benchmarks             # 
  ├─compiler-sfc           # 
  ├─exampless              # 例子，js模态组件示例
  │    ├─classic           # 
  │    ├─composition       # 
  ├─scripts                # 与项目构建相关的脚本和配置文件 ，基本上就是最后打包时候的配置了
  ├─flow                   # flow的类型声明文件
  ├─src                    # 项目源代码
  │    ├─complier          # 与模板编译相关的代码
  │    ├─core              # 核心，通用的、与运行平台无关的运行时代码
  │    │  ├─observe        # 实现变化侦测的代码
  │    │  ├─vdom           # 实现virtual dom的代码
  │    │  ├─instance       # Vue.js实例的构造函数和原型方法
  │    │  ├─global-api     # 全局api的代码
  │    │  └─components     # 内置组件的代码
  │    ├─server            # 与服务端渲染相关的代码
  │    ├─platforms         # 特定运行平台的代码，如weex 
  │    ├─sfc               # 单文件组件的解析代码
  │    └─shared            # 项目公用的工具代码
  ├─test                   # 项目测试代码
  ├─type                   # 项目测试代码
  ├─.editorconfig          # 统一编辑器和IDE处理统一项目代码 https://editorconfig.org/
  ├─.git-blame-ignore-revs          # 
  ├─.gitignore
  ├─.prettierrc
  ├─api-extractor.json              # 微软提供针对typescript的api分析工具，https://zhuanlan.zhihu.com/p/434565485
  ├─api.extractor.tsconfig.json     # 定义ts工作区的根，并使您能够从工作区中包含/排除目录
  ├─BACKERS.md
  ├─CHANGELOG.md
  ├─LICENSE                         # MIT许可证(MIT)
  ├─package.json
  # pnpm同npm和yarn一样，是一个包管理工具，pnpm的出现是为了解决node_modules占用过大的问题。
  ├─pnpm-lock-yaml                  # 执行效率非常快，节省磁盘空间   https://www.pnpm.cn/
  ├─pnpm-workspace.yaml             # 定义工作区的根，并使您能够从工作区中包含/排除目录
  ├─README.md
  ├─tsconfig.json                   # 目录中存在这样一个json文件，说明这个目录是ts的根目录    https://www.tslang.cn/docs/handbook/tsconfig-json.html
  ├─vitest.config.ts                # 基于vite的单元测试框架vitest，语法兼容jest，科技城vite配置，支持热更新 https://cn.vitest.dev/
  ├─
  ├─
  ├─
  └─
  下载的文件没有node_modules, 需要手动安装一下，pnpm install

  rollup和webpack的区别：（rollup中文网：https://www.rollupjs.com/）
    1. webpack 由于年代相对久远，在 commonjs 后且 esMoudles 之前,所以通过 webpack 通过自己来实现 commonjs 等语法，rollup 则可以通过配置打包成想要的语法，比如 esMoudles
    2. rollup 很适合打包成库，而webpack很适合打包成应用
    3. 由于rollup不能够直接读取node_modules中的依赖项，需要引入加载npm模块的插件：rollup-plugin-node-resolve
    4. 由于rollup默认只支持esm模块打包，所以需要引入插件来支持cjs模块：rollup-plugin-commonjs
    5. 由于 rollup 通过可以 esm 模块开发和打包，所以支持 tree-shaking 模式
    6. vite 就是 rollup 开发而来的
    插件：
      rollup 并没有 webpack 的 loader , 只在 rollup-config.js 中配置 plugin:[] 的选项就可以了

      关于插件之后主要讲下 rollup-plugin-common.js 和 rollup-plugin-node-resolve 以及 vue 相关 plugin
    附原文链接：https://blog.csdn.net/weixin_38992765/article/details/126512118

  ```

## 学习路线
  我也是看了这个社区，但是并不能立马看懂，首先我们能看懂各个文件的介绍，看和实际敲代码的距离还是很大的，干脆自己从头开始自己弄，没资料就去查资料，查不到干脆去研究早期的vue原型，然后根据现在的技术，先配置tsconfig和rollup打包（就是源码中script/config.js），然后引入到html中，先串成一个小线，然后不断的往里面增加需求。
  也可以通过vue中文社区说明，去着手：https://vue-js.com/learn-vue/start/

  1. 变化侦测篇
    学习Vue中如何实现数据的响应式系统，从而达到数据驱动视图。

  2. 虚拟 DOM 篇
    学习什么是虚拟 DOM，以及Vue中的DOM-Diff原理

  3. 模板编译篇
    学习Vue内部是怎么把template模板编译成虚拟DOM,从而渲染出真实DOM

  4. 实例方法篇
    学习Vue中所有实例方法(即所有以$开头的方法)的实现原理

  5. 全局 API 篇
    学习Vue中所有全局API的实现原理

  6. 生命周期篇
    学习Vue中组件的生命周期实现原理

  7. 指令篇
    学习Vue中所有指令的实现原理

  8. 过滤器篇
    学习Vue中所有过滤器的实现原理

  9. 内置组件篇
    学习Vue中内置组件的实现原理




说明：我是根据源码找一个入口，然后仿制并加以理解分析的，如侵权请通知我，我会加以修改｜删除等操作。
Introduction: I am according to the source code to find an entry, and then copy and try to understand the analysis, such as copyright infringement, please inform me, I'll wait to revise | delete operation.