import {createPane, Theme, toCss} from '../panepaint';
import {createTheme} from '../themes';
import {selectContainer} from '../util';

declare let hljs: any;
import {Pane} from 'tweakpane';

function applyPreviewHtml(selector: string, theme: Theme, comment: string) {
	const elem = document.querySelector(selector);
	if (!elem) {
		return;
	}

	elem.textContent = [
		`<!-- ${comment} -->`,
		'<style>',
		toCss(':root', theme),
		'</style>',
	].join('\n');

	hljs.highlightBlock(elem);
}

function applyTheme({
	styleElem,
	theme,
}: {
	styleElem: HTMLStyleElement;
	theme: Theme;
}) {
	styleElem.textContent = toCss('*[data-preview-css]', theme);

	applyPreviewHtml(
		'*[data-preview-code]',
		theme,
		'Append this element into the head element to apply the theme',
	);
}

function createPreviewPane(containerElem: HTMLElement, expanded = true) {
	const PARAMS = {
		checkbox: true,
		color: 'rgba(0, 0, 0, 0)',
		list: 'item',
		point2d: {x: 0, y: 0},
		slider: 32,
		text: 'text',
		monitor: [0, 1, 2, 3].map(() => Math.random().toFixed(2)).join('\n'),
	};
	const pane = new Pane({
		container: containerElem,
		title: 'Preview',
	});
	pane.addInput(PARAMS, 'text');
	pane.addInput(PARAMS, 'slider', {
		max: 64,
		min: 0,
	});
	pane.addInput(PARAMS, 'list', {
		options: {item: 'item'},
	});
	pane.addInput(PARAMS, 'checkbox');
	pane.addButton({
		title: 'button',
	});
	pane.addSeparator();
	pane.addMonitor(PARAMS, 'monitor', {
		interval: 0,
		multiline: true,
	});
	pane
		.addFolder({
			title: 'folder',
		})
		.addInput(PARAMS, 'color', {
			expanded: expanded,
			picker: 'inline',
		});
	pane
		.addFolder({
			title: 'folder',
		})
		.addInput(PARAMS, 'point2d', {
			expanded: expanded,
			picker: 'inline',
		});
	return pane;
}

export function initTheming() {
	const styleElem = document.createElement('style');
	document.head.appendChild(styleElem);

	const controllerElem = selectContainer('controller');
	const previewElem = selectContainer('preview');
	if (!controllerElem || !previewElem) {
		return;
	}

	const theme = createTheme('translucent');
	applyPreviewHtml('*[data-exampleCss]', theme, 'Example theme: Translucent');

	const pane = createPane(controllerElem, theme);
	applyTheme({
		styleElem: styleElem,
		theme: theme,
	});
	pane.on('change', () => {
		applyTheme({
			styleElem: styleElem,
			theme: theme,
		});
	});

	createPreviewPane(previewElem);

	const markerToFnMap: {
		[key: string]: (container: HTMLElement) => void;
	} = {
		header: (container) => {
			if (container) {
				createPreviewPane(container, false);
			}
		},
	};
	Object.keys(markerToFnMap).forEach((marker) => {
		const initFn = markerToFnMap[marker];
		const container = selectContainer(marker);
		initFn(container);
	});
}
