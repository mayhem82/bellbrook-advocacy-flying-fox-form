import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const browserDir = path.join(__dirname, '..', 'browser');
const outDir = path.join(__dirname, '..', 'output');
const bundlePath = path.join(browserDir, 'bundle.js');
const previewHtmlPath = path.join(browserDir, 'preview.html');

async function main() {
  await mkdir(outDir, { recursive: true });

  await esbuild.build({
    entryPoints: [path.join(browserDir, 'render-entry.js')],
    bundle: true,
    outfile: bundlePath,
    format: 'iife',
    target: 'es2020',
  });

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
    page.on('console', (msg) => console.log('[browser]', msg.text()));
    page.on('pageerror', (err) => console.error('[browser error]', err));

    await page.goto(`file://${previewHtmlPath}`);
    await page.waitForFunction(() => window.__renderDone === true, { timeout: 15000 });

    const canvas = await page.$('canvas');
    await canvas.screenshot({ path: path.join(outDir, 'preview.png') });

    console.log(`Wrote ${path.join(outDir, 'preview.png')}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
