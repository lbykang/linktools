module.exports = {
  publicPath: "/linktools/",

  // 配置 webpack-dev-server 行为。
  devServer: {
    proxy: {
      // 为天气接口配置代理，解决跨域
      "/api/": {
        target: "http://localhost:8882/auth", //天气接口地址
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 跨域访问设置，true代表跨域
        pathRewrite: {
          // 路径改写规则
          "^/api": "", // 以/api/为开头的改写为''
        },
      },
    },
  },
};
