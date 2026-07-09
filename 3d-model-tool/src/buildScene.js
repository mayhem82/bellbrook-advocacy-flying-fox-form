import { PALETTE } from './materials.js';

// All dimensions in metres. The shipping container is the one object in the
// photos with a known real-world size (a standard 20 ft ISO container:
// 6.06m x 2.44m x 2.59m), so it is used as the scale anchor for everything
// else, which is otherwise proportioned by eye from the photos.
export const DIMENSIONS = {
  container: { length: 6.06, width: 2.44, height: 2.59, supportHeight: 0.3 },
  tunnel: {
    archRadius: 1.6,
    legHeight: 0.5,
    archCount: 8,
    archSpacing: 1.4,
    tubeRadius: 0.02,
  },
  tank: { radius: 0.85, bodyHeight: 1.3, domeHeight: 0.4 },
  bed: { length: 1.7, width: 0.8, height: 0.45 },
  fence: { height: 1.8, thickness: 0.06, length: 13 },
};

const materialCache = new Map();

function getMaterial(THREE, key) {
  if (materialCache.has(key)) return materialCache.get(key);
  const spec = PALETTE[key];
  const material = new THREE.MeshStandardMaterial({
    color: spec.color,
    roughness: spec.roughness,
    metalness: spec.metalness,
  });
  material.name = key;
  materialCache.set(key, material);
  return material;
}

function mesh(THREE, name, geometry, materialKey, position, rotation) {
  const m = new THREE.Mesh(geometry, getMaterial(THREE, materialKey));
  m.name = name;
  if (position) m.position.set(position[0], position[1], position[2]);
  if (rotation) m.rotation.set(rotation[0], rotation[1], rotation[2]);
  return m;
}

function buildHoopTunnel(THREE) {
  const group = new THREE.Group();
  group.name = 'HoopTunnel';
  const { archRadius, legHeight, archCount, archSpacing, tubeRadius } = DIMENSIONS.tunnel;

  const archGeometry = new THREE.TorusGeometry(archRadius, tubeRadius, 8, 24, Math.PI);
  for (let i = 0; i < archCount; i++) {
    const x = i * archSpacing;
    // legs: short vertical posts from the ground up to the arch spring line
    group.add(
      mesh(THREE, `arch_${i}_legL`, new THREE.CylinderGeometry(tubeRadius, tubeRadius, legHeight, 8), 'archSteel',
        [x, legHeight / 2, -archRadius]),
    );
    group.add(
      mesh(THREE, `arch_${i}_legR`, new THREE.CylinderGeometry(tubeRadius, tubeRadius, legHeight, 8), 'archSteel',
        [x, legHeight / 2, archRadius]),
    );
    // arch: torus half-circle rotated to stand in the vertical (Y-Z) plane,
    // then rotated again so its flat diameter edge is horizontal (arc opens upward)
    const arch = mesh(THREE, `arch_${i}`, archGeometry, 'archSteel', [x, legHeight, 0], [0, Math.PI / 2, Math.PI / 2]);
    group.add(arch);
  }

  const tunnelLength = (archCount - 1) * archSpacing;
  const ridgeGeometry = new THREE.CylinderGeometry(tubeRadius, tubeRadius, tunnelLength + 0.4, 8);
  const ridge = mesh(THREE, 'ridgePurlin', ridgeGeometry, 'archSteel',
    [tunnelLength / 2, legHeight + archRadius, 0], [0, 0, Math.PI / 2]);
  group.add(ridge);

  const sidePurlinGeometry = new THREE.CylinderGeometry(tubeRadius * 0.8, tubeRadius * 0.8, tunnelLength + 0.4, 8);
  for (const side of [-1, 1]) {
    group.add(
      mesh(THREE, `sidePurlinUpper_${side}`, sidePurlinGeometry, 'archStripe',
        [tunnelLength / 2, legHeight, side * archRadius], [0, 0, Math.PI / 2]),
    );
    group.add(
      mesh(THREE, `sidePurlinLower_${side}`, sidePurlinGeometry, 'archStripe',
        [tunnelLength / 2, legHeight * 0.35, side * archRadius], [0, 0, Math.PI / 2]),
    );
  }

  return { group, tunnelLength };
}

function buildContainer(THREE, position) {
  const group = new THREE.Group();
  group.name = 'ShippingContainer';
  const { length, width, height, supportHeight } = DIMENSIONS.container;

  const body = mesh(THREE, 'containerBody',
    new THREE.BoxGeometry(length, height, width), 'containerBody',
    [0, supportHeight + height / 2, 0]);
  group.add(body);

  const trim = mesh(THREE, 'containerTopTrim',
    new THREE.BoxGeometry(length + 0.04, 0.08, width + 0.04), 'containerTrim',
    [0, supportHeight + height + 0.04, 0]);
  group.add(trim);

  const supportGeometry = new THREE.CylinderGeometry(0.09, 0.11, supportHeight, 10);
  const inset = 0.4;
  const corners = [
    [-length / 2 + inset, -width / 2 + inset],
    [-length / 2 + inset, width / 2 - inset],
    [length / 2 - inset, -width / 2 + inset],
    [length / 2 - inset, width / 2 - inset],
  ];
  corners.forEach(([cx, cz], i) => {
    group.add(mesh(THREE, `containerSupport_${i}`, supportGeometry, 'containerSupport', [cx, supportHeight / 2, cz]));
  });

  group.position.set(position[0], 0, position[2]);
  return group;
}

function buildWaterTank(THREE, position) {
  const group = new THREE.Group();
  group.name = 'WaterTank';
  const { radius, bodyHeight, domeHeight } = DIMENSIONS.tank;

  group.add(mesh(THREE, 'tankBody', new THREE.CylinderGeometry(radius, radius, bodyHeight, 24), 'tankBody',
    [0, bodyHeight / 2, 0]));

  const domeGeometry = new THREE.SphereGeometry(radius, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  domeGeometry.scale(1, domeHeight / radius, 1);
  group.add(mesh(THREE, 'tankDome', domeGeometry, 'tankBody', [0, bodyHeight, 0]));

  group.add(mesh(THREE, 'tankFitting', new THREE.CylinderGeometry(0.05, 0.05, 0.18, 8), 'tankFitting',
    [radius * 0.95, bodyHeight * 0.85, 0], [0, 0, Math.PI / 2]));

  group.position.set(position[0], 0, position[2]);
  return group;
}

function buildGardenBeds(THREE, startPosition) {
  const group = new THREE.Group();
  group.name = 'GardenBeds';
  const { length, width, height } = DIMENSIONS.bed;
  const offsets = [
    { x: 0, z: 0.2 },
    { x: length + 0.5, z: -0.1 },
    { x: (length + 0.5) * 2, z: 0.25 },
  ];
  offsets.forEach((offset, i) => {
    group.add(mesh(THREE, `bed_${i}`, new THREE.BoxGeometry(length, height, width), 'timberBed',
      [offset.x, height / 2, offset.z]));
  });
  group.position.set(startPosition[0], 0, startPosition[2]);
  return group;
}

function buildFence(THREE, position, length) {
  const group = new THREE.Group();
  group.name = 'Fence';
  const { height, thickness } = DIMENSIONS.fence;

  group.add(mesh(THREE, 'fencePanel', new THREE.BoxGeometry(length, height, thickness), 'fenceTimber',
    [0, height / 2, 0]));
  group.add(mesh(THREE, 'fenceCapping', new THREE.CylinderGeometry(0.035, 0.035, length, 8), 'fenceCapping',
    [0, height + 0.02, 0], [0, 0, Math.PI / 2]));

  const postGeometry = new THREE.CylinderGeometry(0.03, 0.03, height + 0.3, 8);
  const postCount = 6;
  for (let i = 0; i < postCount; i++) {
    const x = (i / (postCount - 1) - 0.5) * (length - 1);
    group.add(mesh(THREE, `fenceOutrigger_${i}`, postGeometry, 'fenceCapping', [x, (height + 0.3) / 2, -0.15]));
  }

  group.position.set(position[0], 0, position[2]);
  return group;
}

function buildCorrugatedStack(THREE, position) {
  const group = new THREE.Group();
  group.name = 'CorrugatedStack';
  const sheetGeometry = new THREE.BoxGeometry(2.4, 0.02, 0.85);
  const count = 5;
  for (let i = 0; i < count; i++) {
    group.add(mesh(THREE, `sheet_${i}`, sheetGeometry, 'corrugatedIron',
      [0, 0.06 + i * 0.045, i * 0.03], [0.08, 0, 0.02]));
  }
  group.position.set(position[0], 0, position[2]);
  return group;
}

export function buildScene(THREE) {
  const root = new THREE.Group();
  root.name = 'BackyardScene';

  const { group: tunnel, tunnelLength } = buildHoopTunnel(THREE);
  root.add(tunnel);

  // Layout convention: the fence runs along the back (most negative Z) as a
  // backdrop, matching the photos where the tunnel, tank, beds and container
  // all sit inside the yard in front of it, closer to the camera.
  const fenceZ = -2.3;
  const groundLength = tunnelLength + 6;
  const groundDepth = 10;
  const groundCenterZ = 0.7;
  const ground = mesh(THREE, 'ground',
    new THREE.BoxGeometry(groundLength, 0.05, groundDepth), 'ground',
    [tunnelLength / 2, -0.025, groundCenterZ]);
  root.add(ground);

  const containerLength = DIMENSIONS.container.length;
  root.add(buildContainer(THREE, [tunnelLength - containerLength / 2 - 0.3, 0, 4.3]));
  root.add(buildWaterTank(THREE, [0.9, 0, -0.2]));
  root.add(buildGardenBeds(THREE, [2.0, 0, 0.3]));
  root.add(buildFence(THREE, [tunnelLength / 2, 0, fenceZ], groundLength - 1));
  root.add(buildCorrugatedStack(THREE, [tunnelLength - 5.0, 0, fenceZ + 0.5]));

  return root;
}
