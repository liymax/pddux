const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	mode:'production',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'sudux.js',
		library: 'sudux',
		libraryTarget: 'umd'
	},

	module: {
		rules: [
			{test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/}
		]
	},
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		immer: {
			root: 'produce',
			commonjs2: 'immer',
			commonjs: 'immer',
			amd: 'immer'
		}
	}
};

