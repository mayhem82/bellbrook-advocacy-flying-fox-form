import * as THREE from 'three';
import { buildScene, DIMENSIONS } from '../src/buildScene.js';

const width = 1600;
const height = 1000;

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(width, height);
renderer.setClearColor(0xbfd8e8, 1);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.add(buildScene(THREE));

const hemi = new THREE.HemisphereLight(0xffffff, 0x445533, 1.1);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 1.6);
sun.position.set(8, 14, 6);
scene.add(sun);
const fill = new THREE.DirectionalLight(0xffffff, 0.4);
fill.position.set(-6, 5, -8);
scene.add(fill);

const tunnelLength = (DIMENSIONS.tunnel.archCount - 1) * DIMENSIONS.tunnel.archSpacing;
const containerCenterX = tunnelLength + 1.5 + DIMENSIONS.container.length / 2;
const centerX = containerCenterX / 2;
const centerZ = -0.6;

const aspect = width / height;
const viewSize = 22;
const camera = new THREE.OrthographicCamera(
  (-viewSize * aspect) / 2, (viewSize * aspect) / 2,
  viewSize / 2, -viewSize / 2,
  0.1, 100,
);
const dist = 26;
camera.position.set(centerX - dist * 0.6, dist * 0.7, centerZ + dist);
camera.lookAt(centerX, 0.8, centerZ);

renderer.render(scene, camera);

window.__renderDone = true;
