module.exports = {

  devServer: {
    disableHostCheck: true,

    proxy: {
      '/baseapi': {
        target: 'https://app-test.myyscm.com',
        pathRewrite: {
          '^/baseapi': ''
        }
      },
      // '/loginurl': {
      //   target: 'https://passport-test.myyscm.com',
      //   pathRewrite: {
      //     '^/loginurl': ''
      //   }
      // }
    }
  }
  // pages: {
  //   index: {
  //     // entry for the pages
  //     entry: process.env.NODE_ENV === 'development' ? './src/main.js' : './src/index.js',
  //     template: '',
  //     library: 'sdk-common',
  //     filename: 'sdk-common.js',
  //     libraryTarget: 'umd',
  //     umdNamedDefine: true
  //   }
  // }
};
