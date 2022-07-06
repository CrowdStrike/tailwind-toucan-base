import { execa } from 'execa';
import path from 'path';

// Vitest compiles to CJS, so we have __dirname.
// In normal ESM, we'd need to create __dirname from import.meta
const root = path.join(__dirname, '..');

// https://vitest.dev/config/#globalsetup
// setup + teardown is a vitest convention for global setup files

export async function setup() {
  await execa('node_modules/.bin/pnpm', ['run', 'build'], {
    preferLocal: true,
    stdio: 'inherit',
    cwd: root,
  });
}

// export async function teardown() {
// }
