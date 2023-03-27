import {nodeResolve} from '@rollup/plugin-node-resolve';
import Typescript from '@rollup/plugin-typescript';
import Cleanup from 'rollup-plugin-cleanup';
import {terser as Terser} from 'rollup-plugin-terser';

export default async () => {
	return {
		input: 'src/doc/ts/bundle.ts',
		external: ['dat.gui', 'tweakpane'],
		output: {
			file: `docs/assets/bundle.js`,
			format: 'umd',
			globals: {
				'dat.gui': 'dat',
				tweakpane: 'Tweakpane',
			},
			sourceMap: true,
		},
		plugins: [
			Typescript({
				tsconfig: 'src/doc/tsconfig.json',
			}),
			nodeResolve({
				preferBuiltins: false,
			}),
			Terser(),
			// https://github.com/microsoft/tslib/issues/47
			Cleanup({
				comments: 'none',
			}),
		],

		onwarn(warning, warn) {
			if (warning.code === 'CIRCULAR_DEPENDENCY') {
				return;
			}
			warn(warning);
		},
	};
};
