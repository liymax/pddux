const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let baseConfig = {
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
      path.join(__dirname, './src')
		],
		alias: {
			src: path.resolve(__dirname, 'src'),
		}
	},

	module: {
		rules: [
			{test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/}
		]
	},
	stats: {
		colors: true
	},
	devtool: '#source-map',
	externals:{
		"insertUser":{root: "insertUser"},
		"getUsers":{root: "getUsers"}
	}
};

let env = process.env.NODE_ENV;
const IsProd = env && env.trim() === "production";

let minConfig=IsProd?{
	optimization: {
		minimize: true,
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: 3,
				uglifyOptions: {
					beautify: false,
					compress: {},
					comments: false,
					output:null,
					mangle: true,
					toplevel: false,
					keep_fnames: false
				},
				sourceMap: false
			})
		]
	}
}:{};

const { platform } = process;
let browser = 'google-chrome';
if (platform === 'darwin') {
  browser = 'google chrome';
} else if (platform === 'win32') {
  browser = 'chrome';
}

let hotPlugins = [
	'react-hot-loader/patch',
	'react-dev-utils/webpackHotDevClient',
	'webpack/hot/only-dev-server'];

module.exports = Object.assign({
	mode: IsProd?"production":"development",
	entry:{
    vendor: ['react', 'react-dom'],
		example:IsProd?"./example/index/index.js":[...hotPlugins,"./example/index/index.js"]
	},

	output:{
		filename:"[name].js",
		path:path.resolve(__dirname,"dist"),
		publicPath: "./"
	},

	plugins:IsProd?[
		new webpack.DefinePlugin({ 'process.env': {NODE_ENV: JSON.stringify('production')} }),
		new CleanWebpackPlugin(['dist']),
		new htmlWebpackPlugin({
			title: "todo example",
			template: "./template/index.html",
			filename: "index.html",
			hash:true,
			inject: "body",
			chunks: ["vendor","example"]
		})
	]:[
		new CleanWebpackPlugin(['dist']),
		new webpack.HotModuleReplacementPlugin(),
		new htmlWebpackPlugin({
			title: "todo example",
			template: "./template/index.html",
			filename: "index.html",
			hash:true,
			inject: "body",
			chunks: ["vendor","example"]
		}),
		new OpenBrowserPlugin({ browser, url: 'http://localhost:9009' })
	]
},baseConfig,minConfig);

