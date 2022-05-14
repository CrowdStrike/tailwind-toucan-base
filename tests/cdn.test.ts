import fse from 'fs-extra';
import path from 'path';
import { describe, expect, test } from 'vitest';

const root = process.cwd();
const cdn = path.join(root, 'toucan.css');

describe('CDN', () => {
  test('file exists', async () => {
    expect(await fse.pathExists(cdn)).toBe(true);
  });

  test('does not change unexpectedly', async () => {
    let buffer = await fse.readFile(cdn);

    expect(buffer.toString()).toMatchSnapshot();
  });
});
