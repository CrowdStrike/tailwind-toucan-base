import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import { stripIndent } from 'common-tags';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outputFile = 'theme-data.js';
const outputDeclarationsFile = 'theme-data.d.ts';
const themeJsonPath = path.join(__dirname, '..', 'src', 'themes.json');

async function build() {
  let json = await fse.readJSON(themeJsonPath);

  await fs.writeFile(
    path.join(__dirname, '..', 'src', outputFile),
    stripIndent`
      export default ${JSON.stringify(json, null, 2)};
    `
  );

  await fs.writeFile(
    path.join(__dirname, '..', 'src', outputDeclarationsFile),
    stripIndent`
      declare let ThemeData = ${JSON.stringify(json, null, 2)};

      export default ThemeData;
    `
  );
}

build();
