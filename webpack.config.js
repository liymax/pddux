const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = {
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
      path.join(__dirname, './src')
		]
	},

	module: {
		rules: [
			{test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/},
			/*{
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['file-loader?limit=1000&name=assets/images/[md5:hash:base64:10].[ext]']
      },*/
		]
	},
	devtool: 'cheap-module-eval-source-map',
  stats: {
    colors: true,
    timings: true,
		version:true,
	  hash:true,
    chunks: true,
    chunkModules: false,
    cached: true,
    cachedAssets: true
  }
};

let hotPolyfill = ['react-hot-loader/patch','react-dev-utils/webpackHotDevClient','webpack/hot/only-dev-server'];
module.exports=Object.assign({
	mode:"development",
	entry:{
    vendor: ['react', 'react-dom'],
		todo:[...hotPolyfill,"./example/todo/index.js"]
	},
	output:{
		filename:"[name].js?v=[hash:8]",
		path:path.resolve(__dirname,"dist"),
		publicPath: "./"
	},

	plugins:[
		new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
		new htmlWebpackPlugin({
			title: "todo example",
			template: "./template/index.html",
			filename: "index.html",
			inject: "body",
			chunks: ["vendor","todo"]
		})
	]
},base);

