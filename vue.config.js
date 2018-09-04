module.exports = {
  // 基本路徑
  baseUrl: '/',
  // 輸出文件目錄
  outputDir: 'dist',
  // eslint-loader 是否在保存的時候檢查
  lintOnSave: true,
  runtimeCompiler: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add(/some-module-to-transpile/) // 要處理的模塊
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 正式環境
    } else {
      // 開發環境
    }
  },
  // vue-loader 配置項
  // https://vue-loader.vuejs.org/en/options.html
  //   vueLoader: {},
  // 生產環境是否生成 sourceMap 文件
  //   productionSourceMap: true,
  // css相關配置
  //   css: {
  //     // 是否使用css分離插件 ExtractTextPlugin
  //     extract: true,
  //     // 開啟 CSS source maps?
  //     sourceMap: false,
  //     // css預設器配置項
  //     loaderOptions: {},
  //     // 啟用 CSS modules for all css / pre-processor files.
  //     modules: false
  //   },
  //   // use thread-loader for babel & TS in production build
  //   // enabled by default if the machine has more than 1 cores
  //   parallel: require('os').cpus().length > 1,
  //   // 是否啟用dll
  //   // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  //   dll: false,
  //   // PWA 插件相關配置
  //   // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  //   pwa: {},
  //   // webpack-dev-server 相關配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 7070,
    https: false,
    hotOnly: false,
    proxy: null, // 設置代理
    before: app => {}
  },
  // 第三方插件配置
  // pluginOptions: {
  //   // ...
  // }
}
