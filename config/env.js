const path = require('path');

module.exports = {
  title: 'App',
  name: 'dachen',
  devServer: {
    clientLogLevel: 'warning', // 输出日志级别
    hot: true, // 启用热更新
    contentBase: path.resolve(__dirname, './dist'), // 告诉服务器从哪里提供内容
    publicPath: '/', // 此路径下的打包文件可在浏览器下访问
    compress: true, // 启用gzip压缩
    host: '0.0.0.0',
    port: 9992,
    open: true, // 自动打开浏览器
    overlay: {
      // 出现错误或者警告时候是否覆盖页面线上错误信息
      warnings: true,
      errors: true
    },
    quiet: false,
    proxy: {
      // 设置代理
      '/dev': {
        target: 'http://dev-yhq1906.dachentech.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      },
      '/test': {
        target: 'http://test-yhq1906.dachentech.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/test': ''
        }
      },
      '/master': {
        target: 'http://test.mediportal.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/master': ''
        }
      },
      '/pre': {
        target: 'http://pre.mediportal.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/pre': ''
        }
      },
      '/xg': {
        target: 'http://xg.mediportal.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/xg': ''
        }
      }
    },
    // stats: 'verbose',
    watchOptions: {
      // 监控文件相关配置
      poll: 1000,
      ignored: /node_modules/, // 忽略监控的文件夹, 正则
      aggregateTimeout: 300 // 默认值, 当你连续改动时候, webpack可以设置构建延迟时间(防抖)
    }
  }
};
