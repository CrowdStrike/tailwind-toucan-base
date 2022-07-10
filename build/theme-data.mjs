import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import { stripIndent } from 'common-tags';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outputFile = 'theme-data.js';
const outputDeclarationsFile = 'index.d.ts';
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
    path.join(__dirname, '..', outputDeclarationsFile),
    stripIndent`
      // Strict type for the themes.json structure
      interface ThemeData ${JSON.stringify(json, null, 2)}

      // Full Built CSS
      declare module '@crowdstrike/tailwind-toucan-base/index.css';
      declare module '@crowdstrike/tailwind-toucan-base/toucan.css';


      // Raw Theme JSON -- also available as theme-data.js
      declare module '@crowdstrike/tailwind-toucan-base/themes' {
        export = ThemeData;
      }
      declare module '@crowdstrike/tailwind-toucan-base/themes.json' {
        export = ThemeData;
      }

      // Tailwind Config
      declare module '@crowdstrike/tailwind-toucan-base';

      declare module '@crowdstrike/tailwind-toucan-base/theme-data' {
        /**
          * Utility type which describes the shape and properties of a particular color.
          */
        export interface ColorInfo {
          category: string[];
          hasAlpha: boolean;
          rgbFill: string;
          fill: {
            r: number;
            g: number;
            b: number;
            a: number;
          };
          name: string;
          value: string;
        }

        const _ThemeData: ThemeData;

        /**
          * The data from the generated theme.json document containing all of the
          * Toucan colors, shadows, etc
          */
        export default _ThemeData;
      }
    `
  );
}

build();
