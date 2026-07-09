// Shared material palette, eyeballed from the reference photos.
// Each entry becomes both a THREE material (for the preview render) and
// a `newmtl` block in the exported .mtl file (see scripts/export-obj.js).
export const PALETTE = {
  archSteel: { color: 0x2d5a3d, roughness: 0.55, metalness: 0.4 }, // dark green powder-coated tube
  archStripe: { color: 0x111111, roughness: 0.5, metalness: 0.3 }, // black accent stripe on the tube
  containerBody: { color: 0x9c4a35, roughness: 0.85, metalness: 0.1 }, // oxidised red-brown paint/rust
  containerTrim: { color: 0xb8b8ad, roughness: 0.6, metalness: 0.3 }, // weathered top rail / corner castings
  containerSupport: { color: 0xd9d5c9, roughness: 0.7, metalness: 0.1 }, // pale pipe stumps under the container
  tankBody: { color: 0x1c3a30, roughness: 0.35, metalness: 0.2 }, // dark green poly water tank
  tankFitting: { color: 0x8a8a8a, roughness: 0.5, metalness: 0.6 }, // inlet pipe fitting
  timberBed: { color: 0x7a4a25, roughness: 0.9, metalness: 0.0 }, // stained pine sleeper garden beds
  fenceTimber: { color: 0x6b5d4c, roughness: 0.95, metalness: 0.0 }, // weathered grey-brown paling fence
  fenceCapping: { color: 0xb0b0a8, roughness: 0.6, metalness: 0.3 }, // galvanised capping rail along fence top
  corrugatedIron: { color: 0xb7bcbf, roughness: 0.6, metalness: 0.5 }, // stacked galvanised roofing sheets
  ground: { color: 0x4f7a3d, roughness: 1.0, metalness: 0.0 }, // grass
};
