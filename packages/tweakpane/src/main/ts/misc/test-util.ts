import {
	BladeApi,
	BladeController,
	Controller,
	createBlade,
	forceCast,
	LabelController,
	LabelPropsObject,
	PlainView,
	ValueMap,
	View,
	ViewProps,
} from '../../../core/index';
import * as assert from 'assert';
import {JSDOM} from 'jsdom';

// TODO: import from core

export function createTestWindow(): Window {
	return forceCast(new JSDOM('').window);
}

class LabelableController implements Controller<View> {
	public readonly viewProps = ViewProps.create();
	public readonly view: PlainView;

	constructor(doc: Document) {
		this.view = new PlainView(doc, {
			viewName: '',
			viewProps: this.viewProps,
		});
	}
}

export function createEmptyLabelableController(doc: Document) {
	return new LabelableController(doc);
}

export function createLabelController(doc: Document, vc: LabelableController) {
	return new LabelController(doc, {
		blade: createBlade(),
		props: ValueMap.fromObject<LabelPropsObject>({label: ''}),
		valueController: vc,
	});
}

export function createEmptyBladeController(
	doc: Document,
): BladeController<PlainView> {
	return new BladeController({
		blade: createBlade(),
		view: new PlainView(doc, {
			viewName: '',
			viewProps: ViewProps.create(),
		}),
		viewProps: ViewProps.create(),
	});
}

export function assertInitialState(api: BladeApi<BladeController<View>>) {
	assert.strictEqual(api.disabled, false);
	assert.strictEqual(api.hidden, false);
	assert.strictEqual(api.controller_.viewProps.get('disposed'), false);
}

export function assertDisposes(api: BladeApi<BladeController<View>>) {
	api.dispose();
	assert.strictEqual(api.controller_.viewProps.get('disposed'), true);
}

export function assertUpdates(api: BladeApi<BladeController<View>>) {
	api.disabled = true;
	assert.strictEqual(api.disabled, true);
	assert.strictEqual(
		api.controller_.view.element.classList.contains('tp-v-disabled'),
		true,
	);

	api.hidden = true;
	assert.strictEqual(api.hidden, true);
	assert.strictEqual(
		api.controller_.view.element.classList.contains('tp-v-hidden'),
		true,
	);
}
