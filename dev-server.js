const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const proxy = require('http-proxy-middleware');
const host = 'localhost', port=9009;

new WebpackDevServer(webpack(config), {
  hot: true,
  compress: true,
  historyApiFallback: true,
  contentBase: 'assets',
  watchOptions: {
    aggregateTimeout:400,
    poll:1000,
    ignored: /node_modules/
  },
  stats: {
    colors: true
  },
  before(app) {
    // 代理配置Demo http://localhost:3000/km/graphql -> http://3ms-beta.huawei.com/km/graphql
    app.use('/km/graphql', proxy({ target: 'http://3ms-beta.huawei.com', changeOrigin: true }));
  }
}).listen(port, host, (err)=> {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at: http://${host}:${port}`);
});
