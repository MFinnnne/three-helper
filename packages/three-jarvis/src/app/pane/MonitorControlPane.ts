import {Pane} from 'my-tweakpane';
import {Object3D} from 'three';
import DefaultControlPane from './DefaultControlPane';

import General from '../../core/General';

export default class MonitorControlPane extends DefaultControlPane {
	protected object?: Object3D;
	protected general: General;

	constructor(general: General) {
		super(general);
		this.general = general;
	}

	public genPane(object?: Object3D): Pane {
		const base = Math.pow(1024, 2);
		const pane = super.genPane(object);
		const monitorFolder = this.pane.addFolder({title: 'monitor'});
		monitorFolder.expanded = false;
		const info = {memory: '', render: '', page: ''};
		monitorFolder.addMonitor(info, 'memory', {multiline: true, lineCount: 2}).on('update', () => {
			const memory = this.general.renderer.info.memory;
			info.memory = `textures: ${memory.textures}\ngeometries: ${memory.geometries}`;
		});
		monitorFolder.addSeparator();
		monitorFolder.addMonitor(info, 'render', {multiline: true, lineCount: 5}).on('update', () => {
			const render = this.general.renderer.info.render;
			info.render = `frame: ${render.frame}\ntriangles: ${render.triangles}\ncalls: ${render.calls}\npoints: ${render.points}\nlines: ${render.lines}\nfps: ${this.general.fps.toFixed(0)}`;
		});
		monitorFolder.addSeparator();
		monitorFolder.addMonitor(info, 'page', {multiline: true, lineCount: 3}).on('update', () => {
			const memory = (window.performance as any).memory;
			info.page = `total: ${(memory.totalJSHeapSize / base).toFixed(2)}\nused: ${(memory.usedJSHeapSize / base).toFixed(2)}\nlimit: ${(memory.jsHeapSizeLimit / base).toFixed(2)}`;
		});
		monitorFolder.addSeparator();

		const fps = {
			wave: this.general.fps,
		};
		setInterval(() => {
			fps.wave = this.general.fps > 60 ? 60 : this.general.fps;
		}, 1000);
		monitorFolder.addMonitor(fps, 'wave', {
			label: 'fps',
			view: 'graph',
			min: 0,
			max: 120,
		});
		return pane;
	}
}
