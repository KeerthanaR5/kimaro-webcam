import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Building Vite SingleFile bundle...');
execSync('npx vite build --config vite.singlefile.config.js', { stdio: 'inherit' });

const distHtmlPath = path.resolve('dist-singlefile/index.html');
let html = fs.readFileSync(distHtmlPath, 'utf-8');

console.log('Inlining images as Base64 Data URIs into kimaro.html...');
const assetsDir = path.resolve('public/assets');
const assetFiles = fs.readdirSync(assetsDir);

for (const file of assetFiles) {
  const filePath = path.join(assetsDir, file);
  const ext = path.extname(file).toLowerCase();
  let mimeType = 'image/jpeg';
  if (ext === '.webp') mimeType = 'image/webp';
  else if (ext === '.png') mimeType = 'image/png';
  else if (ext === '.svg') mimeType = 'image/svg+xml';
  
  const base64 = fs.readFileSync(filePath).toString('base64');
  const dataUri = `data:${mimeType};base64,${base64}`;

  // Replace both /assets/file and assets/file
  const regex1 = new RegExp(`/assets/${file.replace('.', '\\.')}`, 'g');
  const regex2 = new RegExp(`assets/${file.replace('.', '\\.')}`, 'g');
  html = html.replace(regex1, dataUri);
  html = html.replace(regex2, dataUri);
}

const targetPath = path.resolve('kimaro.html');
fs.writeFileSync(targetPath, html, 'utf-8');
console.log(`Success! Standalone runnable HTML written to: ${targetPath} (${(fs.statSync(targetPath).size / 1024).toFixed(1)} KB)`);
