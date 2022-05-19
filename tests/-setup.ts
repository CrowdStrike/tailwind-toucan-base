import { execa } from 'execa';

// https://vitest.dev/config/#globalsetup
// setup + teardown is a vitest convention for global setup files

export async function setup() {
  await execa('node_modules/.bin/pnpm', ['run', 'build'], { preferLocal: true, stdio: 'inherit' });
}

// export async function teardown() {
// }
