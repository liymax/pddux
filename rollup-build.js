const path = require("path");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const { uglify } = require("rollup-plugin-uglify");
const { rollup } = require("rollup");

function build(mode, filename){
	const plugins = [
		babel({
			babelrc: false,
			exclude: "node_modules/**",
			presets: ["es2015-rollup", "react",'stage-0'],
			//plugins: ["transform-decorators-legacy", "transform-class-properties"]
		}),
		resolve({
			module: true,
			main: true
		}),
		commonjs()
	];
	if(mode.endsWith(".min")) {
		plugins.push(
			uglify({
				ie8: false,
				warnings: false
			})
		)
	}

	return rollup({
		input: "src/index.js",
		external: ["react", "immer"],
		plugins: plugins
	}).then(function(bundle) {
		const options = {
			file: path.resolve(__dirname,"lib", filename),
			format: mode.endsWith(".min") ? mode.slice(0, -4) : mode,
			name: "sudux",
			exports: "named",
			globals: {
				react: "React",
				immer: "produce"
			}
		};
		return bundle.write(options)
	}).catch(function(reason) {
		console.error(reason);
		process.exit(-1)
	})
}

Promise.all([
	build( "umd", "index.js"),
	build( "umd.min", "index.min.js"),
	build( "es", "index.module.js")
]);
