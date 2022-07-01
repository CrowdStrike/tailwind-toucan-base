import fse from 'fs-extra';
import path from 'path';
import { describe, expect, test } from 'vitest';

const root = path.join(__dirname, '..');
const cssImport = path.join(root, 'index.css');

describe('CSS @import', () => {
  test('file exists', async () => {
    expect(await fse.pathExists(cssImport)).toBe(true);
  });

  test('does not change unexpectedly', async () => {
    let buffer = await fse.readFile(cssImport);

    expect(buffer.toString()).toMatchSnapshot();
  });
});
