import {nodeResolve} from '@rollup/plugin-node-resolve';
import Replace from '@rollup/plugin-replace';
import Typescript from '@rollup/plugin-typescript';
import Autoprefixer from 'autoprefixer';
import Postcss from 'postcss';
import Cleanup from 'rollup-plugin-cleanup';
import terser from '@rollup/plugin-terser';
import Sass from 'sass';

import Package from './package.json';

async function compileCss() {
	const css = Sass.renderSync({
		file: 'src/main/sass/bundle.scss',
		outputStyle: 'compressed',
	}).css.toString();

	const result = await Postcss([Autoprefixer]).process(css, {
		from: undefined,
	});
	return result.css.replace(/'/g, "\\'").trim();
}

function getPlugins(css, shouldMinify) {
	const plugins = [
		Typescript({
			tsconfig: 'src/main/tsconfig.json',
		}),
		nodeResolve({
			preferBuiltins: false,
		}),
		Replace({
			__css__: css,
			'1.0.0': Package.version,
			preventAssignment: true,
		}),
	];
	if (shouldMinify) {
		plugins.push(terser());
	}
	return [
		...plugins,
		// https://github.com/microsoft/tslib/issues/47
		Cleanup({
			comments: 'none',
		}),
	];
}

export default async () => {
	// eslint-disable-next-line no-undef
	const production = process.env.BUILD === 'production';
	const postfix = production ? '.min' : '';

	const css = await compileCss();
	return {
		input: 'src/main/ts/index.ts',
		output: {
			banner: `/*! Tweakpane ${Package.version} (c) 2016 cocopon, licensed under the MIT license. */`,
			file: `docs/assets/tweakpane${postfix}.js`,
			format: 'umd',
			sourceMap: true,
			name: 'Tweakpane',
		},
		plugins: getPlugins(css, production),

		onwarn(warning, warn) {
			if (warning.code === 'CIRCULAR_DEPENDENCY') {
				return;
			}
			warn(warning);
		},
	};
};
