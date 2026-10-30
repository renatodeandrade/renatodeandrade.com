import { copyFile, mkdir, rm, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
const files = [
  'index.html',
  'styles.css',
  'script.js',
  'favicon.svg',
  'assets/asteroid-observation.gif',
  'assets/asteroid-observation-still.png',
];

// Check inputs before replacing the generated directory.
for (const file of files) {
  if (!(await stat(resolve(root, file))).isFile()) {
    throw new Error(`Missing site file: ${file}`);
  }
}

await rm(output, { recursive: true, force: true });
for (const file of files) {
  const destination = resolve(output, file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(resolve(root, file), destination);
}

console.log(`Prepared ${files.length} static files in dist/`);
