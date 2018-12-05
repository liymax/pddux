module.exports = function (api) {
	console.log("babel.config");
	api.cache(true);
	let presets = [
		["@babel/preset-env", {
			"useBuiltIns": "usage",
			"debug":false
		}],
		"@babel/preset-react",
	];

	let plugins = [
		[ "babel-plugin-styled-components", { "ssr": false } ],
		[
			"@babel/plugin-proposal-decorators", { "legacy": true}
		],
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-proposal-function-bind",
		"@babel/plugin-proposal-do-expressions",
		"react-hot-loader/babel",
	];

	return {
		presets,
		plugins,
	}
};
