import { execa } from 'execa';

// https://vitest.dev/config/#globalsetup
// setup + teardown is a vitest convention for global setup files

export async function setup() {
  await execa('yarn', ['build'], { preferLocal: true });
}

// export async function teardown() {
// }
