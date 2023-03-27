import {
	Color,
	colorFromRgbNumber,
	createColorStringParser,
} from '../../../core/index';
import {Pane, Point2d, Point3d, Point4d} from 'tweakpane';

import {selectContainer} from '../util';

export function initInputBindings() {
	const markerToFnMap: {
		[key: string]: (container: HTMLElement) => void;
	} = {
		input: (container) => {
			const PARAMS = {
				b: true,
				c: '#ff0055',
				n: 50,
				v2: {x: 12, y: 34},
				v3: {x: 12, y: 34, z: 56},
				s: 'string',
			};
			const pane = new Pane({
				container: container,
			});
			const nf = pane.addFolder({
				title: 'Number',
			});
			nf.addInput(PARAMS, 'n', {
				label: 'text',
			});
			nf.addInput(PARAMS, 'n', {
				label: 'slider',
				max: 100,
				min: 0,
			});
			nf.addInput(PARAMS, 'n', {
				label: 'list',
				options: {
					low: 0,
					medium: 50,
					high: 100,
				},
			});
			const sf = pane.addFolder({
				title: 'String',
			});
			sf.addInput(PARAMS, 's', {
				label: 'text',
			});
			sf.addInput(PARAMS, 's', {
				label: 'list',
				options: {
					dark: 'Dark',
					light: 'Light',
				},
			});
			const bf = pane.addFolder({
				title: 'Boolean',
			});
			bf.addInput(PARAMS, 'b', {
				label: 'checkbox',
			});
			const mf = pane.addFolder({
				title: 'Misc',
			});
			mf.addInput(PARAMS, 'c', {
				label: 'color',
			});
			mf.addInput(PARAMS, 'v2', {
				label: '2d',
			});
			mf.addInput(PARAMS, 'v3', {
				label: '3d',
			});
		},
		numbertext: (container) => {
			const PARAMS = {value: 40};
			const pane = new Pane({
				container: container,
			});
			const np = pane.addInput(PARAMS, 'value', {
				label: 'text',
			});
			np.setValue(123, false);
		},
		slider: (container) => {
			const PARAMS = {value: 50};
			const pane = new Pane({
				container: container,
			});
			const np = pane.addInput(PARAMS, 'value', {
				label: 'slider',
				max: 100,
				min: 0,
			});
			np.setValue(90, false);
		},
		step: (container) => {
			const PARAMS = {
				speed: 0.5,
				count: 10,
			};
			const pane = new Pane({
				container: container,
			});
			const np1 = pane.addInput(PARAMS, 'speed', {
				step: 0.1,
			});
			np1.setValue(1.11);
			const np2 = pane.addInput(PARAMS, 'count', {
				label: 'count',
				max: 100,
				min: 0,
				step: 10,
			});
			np2.setValue(13, false);
		},
		numberlist: (container) => {
			const PARAMS = {
				quality: 0,
			};
			const consoleElem = selectContainer('numberlist', true);
			const log = {
				json: '',
			};
			const consolePane = new Pane({
				container: consoleElem,
			});
			consolePane.addMonitor(log, 'json', {
				interval: 0,
				label: 'PARAMS',
				multiline: true,
			});

			const updateLog = () => {
				log.json = JSON.stringify(PARAMS, undefined, 2);
				consolePane.refresh();
			};

			const pane = new Pane({
				container: container,
			});
			const np = pane
				.addInput(PARAMS, 'quality', {
					options: {
						low: 0,
						medium: 50,
						high: 100,
					},
				})
				.on('change', () => {
					updateLog();
				});
			np.setValue(50, false);
			updateLog();
		},
		numberformatter: (container) => {
			const PARAMS = {value: 0};
			const pane = new Pane({
				container: container,
			});
			const np = pane.addInput(PARAMS, 'value', {
				format: (v) => v.toFixed(6),
				label: 'k',
			});
			np.setValue(1);
		},
		stringtext: (container) => {
			const PARAMS = {value: 'hello, world'};
			const pane = new Pane({
				container: container,
			});
			pane.addInput(PARAMS, 'value', {
				label: 'message',
			});
		},
		stringlist: (container) => {
			const PARAMS = {theme: ''};

			const consoleElem = selectContainer('stringlist', true);
			const log = {
				json: '',
			};
			const consolePane = new Pane({
				container: consoleElem,
			});
			consolePane.addMonitor(log, 'json', {
				interval: 0,
				label: 'PARAMS',
				multiline: true,
			});

			const updateLog = () => {
				log.json = JSON.stringify(PARAMS, undefined, 2);
				consolePane.refresh();
			};

			const pane = new Pane({
				container: container,
			});
			pane
				.addInput(PARAMS, 'theme', {
					options: {
						none: '',
						dark: 'dark-theme.json',
						light: 'light-theme.json',
					},
				})
				.on('change', () => {
					updateLog();
				});
			updateLog();
		},
		checkbox: (container) => {
			const PARAMS = {value: true};
			const pane = new Pane({
				container: container,
			});
			pane.addInput(PARAMS, 'value', {
				label: 'hidden',
			});
		},
		objectcolor: (container) => {
			const PARAMS = {
				background: {r: 255, g: 0, b: 84},
				tint: {r: 0, g: 255, b: 214, a: 0.5},
			};
			const pane = new Pane({
				container: container,
			});
			const np = pane.addInput(PARAMS, 'background');
			np.setValue(new Color([1, 1, 1, 0], 'rgb'));
			pane.addInput(PARAMS, 'tint');
		},
		floatcolor: (container) => {
			const PARAMS = {
				overlay: {r: 1, g: 0, b: 0.33},
			};
			const pane = new Pane({
				container: container,
			});
			const np = pane.addInput(PARAMS, 'overlay', {
				color: {type: 'float'},
			});
			np.setValue(new Color([1, 0, 0.5], 'rgb', 'float'));
		},
		stringcolor: (container) => {
			const PARAMS = {
				primary: '#f05',
				secondary: 'rgb(0, 255, 214)',
			};
			const pane = new Pane({
				container: container,
			});
			const np = pane.addInput(PARAMS, 'primary');
			pane.addInput(PARAMS, 'secondary');
			np.setValue(createColorStringParser('int')('#fff'));
		},
		numbercolor: (container) => {
			const PARAMS = {
				background: 0xff0055,
				tint: 0x00ffd644,
			};
			const pane = new Pane({
				container: container,
			});
			const np = pane.addInput(PARAMS, 'background', {
				view: 'color',
			});
			np.setValue(colorFromRgbNumber(0xffffff));
			pane.addInput(PARAMS, 'tint', {
				color: {
					alpha: true,
				},
			});
		},
		inputstring: (container) => {
			const PARAMS = {
				hex: '#0088ff',
			};
			const pane = new Pane({
				container: container,
			});
			pane.addInput(PARAMS, 'hex', {
				view: 'text',
			});
		},
		colorinline: (container) => {
			const PARAMS = {
				key: '#ff0055ff',
			};
			const pane = new Pane({
				container: container,
			});
			pane.addInput(PARAMS, 'key', {
				expanded: true,
				picker: 'inline',
			});
		},
		point2d: (container) => {
			const PARAMS = {value: {x: 50, y: 25}};
			const pane = new Pane({
				container: container,
			});
			const np = pane.addInput(PARAMS, 'value', {
				label: 'offset',
			});
			np.setValue(new Point2d(100, 10));
		},
		point2dparams: (container) => {
			const PARAMS = {value: {x: 20, y: 30}};
			const pane = new Pane({
				container: container,
			});
			const np = pane.addInput(PARAMS, 'value', {
				label: 'offset',
				x: {step: 20},
				y: {min: 0, max: 100},
			});
			np.setValue(new Point2d(100, 100));
		},
		point2dinvertedy: (container) => {
			const PARAMS = {value: {x: 50, y: 50}};
			const pane = new Pane({
				container: container,
			});
			const np = pane.addInput(PARAMS, 'value', {
				label: 'offset',
				y: {inverted: true},
			});
			np.setValue(new Point2d(100, 100));
		},
		point2dinline: (container) => {
			const PARAMS = {value: {x: 50, y: 25}};
			const pane = new Pane({
				container: container,
			});
			pane.addInput(PARAMS, 'value', {
				expanded: true,
				label: 'offset',
				picker: 'inline',
			});
		},
		point3d: (container) => {
			const PARAMS = {
				camera: {x: 0, y: 20, z: -10},
				source: {x: 0, y: 0, z: 0},
			};
			const pane = new Pane({
				container: container,
			});
			const np1 = pane.addInput(PARAMS, 'source');
			np1.setValue(new Point3d(100, 100, 100));
			pane.addInput(PARAMS, 'camera', {
				y: {step: 10},
				z: {max: 0},
			});
		},
		point4d: (container) => {
			const PARAMS = {
				color: {x: 0, y: 0, z: 0, w: 1},
			};
			const pane = new Pane({
				container: container,
			});
			const copt = {min: 0, max: 1};
			const np = pane.addInput(PARAMS, 'color', {
				x: copt,
				y: copt,
				z: copt,
				w: copt,
			});
			np.setValue(new Point4d(0, 100, 100, 100));
		},
	};
	Object.keys(markerToFnMap).forEach((marker) => {
		const initFn = markerToFnMap[marker];
		const container = selectContainer(marker);
		initFn(container);
	});
}
