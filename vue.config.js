const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  // publicPath: '/VisOnboarding/',
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        target: 'http://localhost:8099',
        changeOrigin: true,
        pathRewrite:{'^/api': ''},
      }
    },
    // base: '/client/public'
  }
});
