import { Camera, Object3D, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export type Events = {
    objectDomClick: (id: string) => void;
    objectDomDoubleClick: (id: string) => void;
    objectClick: (object3D: Object3D) => void;
    objectDoubleClick: (object3D: Object3D) => void;
    objectHover: (object3D: Object3D) => void;
    objectOut: (object3D: Object3D) => void;
    cameraDomClick: () => void;
    renderDomClick: () => void;
    lockObject: (object3d: Object3D) => void;
    menuItemClick: (type: string, e: Event) => void;
};

export type Command = {
    object?: Object3D;
    name?: string;

    exec(): void;

    undo(): void;
};

export type LoadModelConfig = {
    id: string;
    name: string;
    path: string;
    position: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number; order?: string };
    quaternion: { x: number; y: number; z: number; w: number };
    afterRender: (model: GLTF) => void;
    beforeRender: () => void;
};

export type LoadConfig = {
    loadModelConfigs: LoadModelConfig[];
    beforeLoad: () => void;
    afterLoad: (objects: GLTF[]) => void;
};
