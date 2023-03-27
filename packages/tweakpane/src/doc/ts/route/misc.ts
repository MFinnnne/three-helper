import {Pane} from 'tweakpane';

import {selectContainer, wave} from '../util';

export function initMisc() {
	const IMEX_PARAMS = {
		color: '#00ffd6',
		name: 'exported json',
		size: 10,
	};
	const IMEX_LOG = {
		log: '',
	};

	const markerToFnMap: {
		[key: string]: (container: HTMLElement) => void;
	} = {
		event: (container) => {
			const consoleElem = selectContainer('eventconsole');
			if (!consoleElem) {
				return;
			}

			const PARAMS = {
				log: '',
				value: 0,
			};

			const consolePane = new Pane({
				container: consoleElem,
			});
			consolePane.addMonitor(PARAMS, 'log', {
				bufferSize: 10,
				interval: 0,
				label: 'console',
				lineCount: 5,
			});

			const pane = new Pane({
				container: container,
			});
			pane
				.addInput(PARAMS, 'value', {
					max: 100,
					min: 0,
				})
				.on('change', (ev) => {
					PARAMS.log = ev.value.toFixed(2);
					consolePane.refresh();
					if (ev.last) {
						PARAMS.log = '(last)';
						consolePane.refresh();
					}
				});
		},

		globalevent: (container) => {
			const consoleElem = selectContainer('globaleventconsole');
			if (!consoleElem) {
				return;
			}

			const PARAMS = {
				boolean: true,
				color: '#ff0055',
				number: 0,
				point2d: {x: 0, y: 0},
				string: 'text',

				log: '',
			};

			const consolePane = new Pane({
				container: consoleElem,
			});
			consolePane.addMonitor(PARAMS, 'log', {
				bufferSize: 10,
				interval: 0,
				label: 'console',
				lineCount: 5,
			});

			const pane = new Pane({
				container: container,
			});
			pane.addInput(PARAMS, 'boolean');
			pane.addInput(PARAMS, 'color');
			const f = pane.addFolder({
				title: 'Folder',
			});
			f.addInput(PARAMS, 'number', {
				max: 100,
				min: 0,
			});
			f.addInput(PARAMS, 'point2d');
			f.addInput(PARAMS, 'string');
			pane.on('change', (ev) => {
				const v =
					typeof ev.value === 'number'
						? ev.value.toFixed(2)
						: JSON.stringify(ev.value);
				PARAMS.log = `changed: ${v}`;
				consolePane.refresh();
			});
		},

		setValue: (container) => {
			const PARAMS = {
				boolean: true,
				color: '#ff0055',
				number: 0,
				point2d: {x: 0, y: 0},
				string: 'text',

				log: '',
			};

			const consoleElem = selectContainer('setValueConsole');
			if (!consoleElem) {
				return;
			}
			const consolePane = new Pane({
				container: consoleElem,
			});
			consolePane.addMonitor(PARAMS, 'log', {
				label: 'preset',
				lineCount: 5,
				multiline: true,
			});

			const pane = new Pane({
				container: container,
			});
			const np1 = pane
				.addInput(
					{
						hidden: false,
					},
					'hidden',
				)
				.on('change', (ev) => {
					const v = JSON.stringify(ev.value);
					PARAMS.log = `hidden: ${v}`;
					consolePane.refresh();
				});
			pane
				.addButton({
					title: 'rigger change event',
				})
				.on('click', () => {
					np1.setValue(Math.random() > 0.5);
				});
			pane
				.addButton({
					title: 'trigger change event',
				})
				.on('click', () => {
					np1.setValue(Math.random() > 0.5, false);
				});
		},

		export: (container) => {
			const consoleElem = selectContainer('exportconsole');
			if (!consoleElem) {
				return;
			}

			const consolePane = new Pane({
				container: consoleElem,
			});
			consolePane.addMonitor(IMEX_LOG, 'log', {
				label: 'preset',
				lineCount: 5,
				multiline: true,
			});

			const pane = new Pane({
				container: container,
			});
			pane.addInput(IMEX_PARAMS, 'name');
			pane.addInput(IMEX_PARAMS, 'size', {
				max: 100,
				min: 0,
			});
			pane.addInput(IMEX_PARAMS, 'color');

			const updatePreset = () => {
				const preset = pane.exportPreset();
				IMEX_LOG.log = JSON.stringify(preset, null, 2);
			};

			pane.on('change', updatePreset);
			updatePreset();
		},

		import: (container) => {
			const consoleElem = selectContainer('importconsole');
			if (!consoleElem) {
				return;
			}

			const consolePane = new Pane({
				container: consoleElem,
			});
			consolePane.addMonitor(IMEX_LOG, 'log', {
				label: 'preset',
				lineCount: 5,
				multiline: true,
			});

			const PARAMS = {
				color: '#ff0055',
				log: '',
				name: 'Pane',
				size: 50,
			};
			const pane = new Pane({
				container: container,
			});
			pane
				.addButton({
					label: 'preset',
					title: 'Import',
				})
				.on('click', () => {
					pane.importPreset(IMEX_PARAMS);
				});
			pane.addSeparator();
			pane.addInput(PARAMS, 'name');
			pane.addInput(PARAMS, 'size');
			pane.addInput(PARAMS, 'color');
		},

		presetkey: (container) => {
			const consoleElem = selectContainer('presetkeyconsole');
			if (!consoleElem) {
				return;
			}

			const PARAMS = {
				foo: {speed: 1 / 3},
				bar: {speed: 2 / 3},
				preset: '',
			};

			const consolePane = new Pane({
				container: consoleElem,
			});
			consolePane.addMonitor(PARAMS, 'preset', {
				interval: 0,
				label: 'preset',
				lineCount: 4,
				multiline: true,
			});

			const pane = new Pane({
				container: container,
			});
			pane.addInput(PARAMS.foo, 'speed', {
				max: 1,
				min: 0,
			});
			pane.addInput(PARAMS.bar, 'speed', {
				max: 1,
				min: 0,
				presetKey: 'speed2',
			});

			const updatePreset = () => {
				const preset = pane.exportPreset();
				PARAMS.preset = JSON.stringify(preset, null, 2);
				consolePane.refresh();
			};

			pane.on('change', updatePreset);
			updatePreset();
		},

		label: (container) => {
			const PARAMS = {
				initSpd: 0,
				size: 30,
			};
			const pane = new Pane({
				container: container,
			});
			pane.addInput(PARAMS, 'initSpd', {
				label: 'Initial speed',
			});
			pane.addInput(PARAMS, 'size', {
				label: 'Force field\nradius',
			});
		},

		insert: (container) => {
			const pane = new Pane({
				container: container,
			});
			pane.addButton({title: 'Run'});
			pane.addButton({title: 'Stop'});
			pane.addButton({title: '**Reset**', index: 1});
		},

		hidden: (container) => {
			const PARAMS = {
				seed: 0.1,
			};
			const pane = new Pane({
				container: container,
			});

			const f = pane.addFolder({title: 'Advanced'});
			f.addInput(PARAMS, 'seed');

			pane
				.addButton({
					index: 0,
					label: 'advanced',
					title: 'Toggle',
				})
				.on('click', () => {
					f.hidden = !f.hidden;
				});
		},

		disabled: (container) => {
			let wavet = 0;
			const PARAMS = {
				input: 1,
				monitor: 0,
			};
			setInterval(() => {
				PARAMS.monitor = wave(wavet);
				wavet += 1;
			}, 200);

			const pane = new Pane({
				container: container,
			});

			pane.addSeparator();
			const i = pane.addInput(PARAMS, 'input', {
				disabled: true,
			});
			const m = pane.addMonitor(PARAMS, 'monitor', {
				disabled: true,
			});
			const btn = pane.addButton({
				disabled: true,
				title: 'Button',
			});
			pane
				.addButton({
					index: 0,
					label: 'disabled',
					title: 'Toggle',
				})
				.on('click', () => {
					i.disabled = !i.disabled;
					m.disabled = !m.disabled;
					btn.disabled = !btn.disabled;
				});
		},
	};
	Object.keys(markerToFnMap).forEach((marker) => {
		const initFn = markerToFnMap[marker];
		const container = selectContainer(marker);
		initFn(container);
	});
}
