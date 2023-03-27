import Alias from '@rollup/plugin-alias';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import Typescript from '@rollup/plugin-typescript';

export default () => {
	return {
		input: 'plugin/src/index.ts',
		external: ['tweakpane'],
		output: {
			file: 'plugin/dist/bundle.js',
			format: 'umd',
			globals: {
				tweakpane: 'Tweakpane',
			},
			name: 'TweakpanePluginExample',
		},
		plugins: [
			Alias({
				entries: [
					{
						find: '@tweakpane/core',
						replacement: './node_modules/@tweakpane/core/dist/es6/index.js',
					},
				],
			}),
			Typescript({
				tsconfig: 'plugin/tsconfig.json',
			}),
			nodeResolve(),
		],

		onwarn(warning, warn) {
			if (warning.code === 'CIRCULAR_DEPENDENCY') {
				return;
			}
			warn(warning);
		},
	};
};
