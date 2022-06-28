'use strict';

import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import { execa } from 'execa';
import { stripIndent } from 'common-tags';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const root = path.join(__dirname, '..');
const targetDir = path.join(root, 'dist');
const cssDir = path.join(targetDir, 'css');
const jsDir = path.join(targetDir, 'js');

async function main() {
  await execa(
    'pnpm',
    [
      'exec',
      'tailwind-config-viewer',
      'export',
      './dist/',
      '-c',
      './lib/tailwind.config.preview.js',
    ],
    {
      cwd: root,
    }
  );

  if (process.env.SKIP_MODIFICATIONS) return;

  // tailwind-config-viewer doesn't use our actual CSS..............
  // so we build our own HTML...
  let jsFiles = [];
  let cssFiles = [];
  let config;

  await crawlFiles(targetDir, ({ fileName }) => {
    if (fileName.endsWith('.js')) {
      if (fileName.includes('app')) {
        jsFiles = [fileName, ...jsFiles];
      }

      if (fileName.includes('vendor')) {
        jsFiles = [...jsFiles, fileName];
      }
    }
  });

  await crawlFiles(cssDir, ({ fileName }) => {
    if (fileName.endsWith('.css')) {
      cssFiles.push(fileName);
    }
  });

  await crawlFiles(targetDir, ({ fileName }) => {
    if (fileName.includes('config') && fileName.endsWith('.json')) {
      config = fileName;
    }
  });

  if (!(await fse.pathExists('dist/css/toucan.css'))) {
    console.debug('Copying toucan.css to dist/css...');
    // move our styles over.
    await execa('cp', ['./toucan.css', './dist/css/toucan.css'], { cwd: root });
  }

  // Setup our manual test page(s)
  await fse.mkdirp(path.join(root, './dist/manual'));
  await execa('cp', ['./manual-test.html', './dist/manual/index.html'], { cwd: root });
  await execa('cp', ['./toucan.css', './dist/manual/toucan.css'], { cwd: root });

  // Apply the same fingerprint to toucan as exists on the default CSS
  let fingerprint = cssFiles[0].split('.')[1];
  let newName = `toucan.${fingerprint}.css`;

  await fse.move(
    path.join(root, 'dist', 'css', 'toucan.css'),
    path.join(root, 'dist', 'css', newName)
  );

  cssFiles.push(newName);

  // This may be motivation enough to build ditch tailwind-config-viewer and
  // build this tool ourselves, but the fact it _also_ uses tailwind is problematic
  // because our CSS is in conflict.
  // It needs to burn in the CSS classes or at least namespace them...
  // in the mean time, we can reverse the order of the CSS files (loading ours first)
  // so that the tailwind-config-viewer classes override ours (since they are required for layout)
  cssFiles = cssFiles.reverse();

  console.debug('Creating replacement index.html...');

  if (process.env.DEBUG) {
    console.debug('Original file:');

    let original = await fs.readFile(path.join(root, 'dist', 'index.html'));

    console.debug(original.toString());

    console.debug('Detected Files', { jsFiles, cssFiles, config });
  }

  await fs.writeFile(
    path.join(root, 'dist', 'index.html'),
    stripIndent`
    <!DOCTYPE html>
    <html lang=en>
      <head>
        <meta charset=utf-8>
        <meta http-equiv=X-UA-Compatible content="IE=edge">
        <meta name=viewport content="width=device-width,initial-scale=1">
        <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAELklEQVR4Ac2XA5T0SBSFe23bVlfSaxsdrG3btm3btm3btvn/+28H3WNnv9vT2ZP1eCbn3JNKTabqvvvue5XODfuV5HJjDT+J43NjDzupZJNNxhkWEkExv3q9v+h0GierrDJusklunL8oM7hX6Fibha65Llln8Yn1/NsqZtLYWWileJVFptTzJ5uY8QdfBc+6GRJPhv68k6ekIs+clqqRQGJQUzKK6APXPAuJT+I1F5pDc5FnXRi61h2pMndCRj4ZcCLPkfeSu9BMZacwFyQeAg2/OXm/SsI1V0LqlcAzS2Z9ITIQGXvAyMSetUroWcc3+YVZifrset9KSMMF5bXsqUI3fxAkvo1c65TUF1kyShP3/pMJHHM0ET9Qcc28ENqQTSPwJRuvFRXtNRm/B36IXWu/eqcw/T81NFLU+zRJznQcO9ZxbPIxBtyiUlxovkjmdEwbc1f9toZZgfTc0rV2IYHod7xzJioVpdI/kklLurdNSJuz0VcyYOgXlokde30IvCFEjrW2UtUBiQQw1xq41jvczwcbjfGtebT5Xz2mFPVKCSKbrRq9Z75RpFHRLE8qjlSpBqQHgqc3rWknZc9KWteyExHSWCnivdu571zyCgv81S89OpiyagSuvQZkHmHBN0nFAZDauiq9Z2/C/fn2tVDBs5r4eydpSZoh1QmZRt8WmR/5n6t5b4XM+j3rrMpf9lnSR+Qfo17CwvujwgbM7cE4qXRH3gG6QHvk4pkaGfmFcYMMrmbWYyX+7cUAP7DBRfhj0+4SNXdrk5pRkxQpGdAsRTRXopoywfXsCukL6pLZuZ9XX3Ca2LV3UE+I/fyiLF5WtBBryZKIgEjUFKqPUgIo0eOPlDqMFDlmz8DJL63nRjrmmNWtGbILhfSFFgg0qHl1y9+VQZt8ogr6yp93guz6Pe4VsWsWZoHzJD33E8jnMzonVCn6e2ndBSYjBSfFnknaqAhFXGasZykhYlTNmNDJH8d9qV+dwiTp2sf/lymzDL9D7sjL78aCj4JKst4ikjgAhwVefnVIrYYx94XIW/q7KkNgvkk+AFSGVTUkxF8DO/W8LEH21FQ6VAngYfrEF+BqKuJUortO5wgbX0Bzui9GdpUic2WIxYzDAJ8oXWpgJcds3mMz/ltL1QlKNDsi97oiwcJ1IGaj37g3gi6ZUVCjEiDcVDPmqLhoFunV1/Od6cn3D7mrozrUPSV1nWelVZDoZK1FXQ+eBCcqnRB5Qn2lz5/y4I+juFbfE0LgCJUeiohAK6XXAd5hfHLJsRfPrqGvL971BuR3RZqiaI3Fp8AjF8j5yTqFajfUBw3YJfLNOjSyBdMmN2if9TKq/KDTlI2/AJXAM9thymNQ6BARTjuixoP620LfCxC4Xf5ITZtGr82H5KeeZBeG9EePOtxfDx1Fnna+IbvS0s2N5Ot396LRwiTPgrkAAAAASUVORK5CYII=" sizes="32x32">
        <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABt0lEQVR4AaVTA8ydMRTtbMez0X6zzbaP/2O0cGY427YXbXGyxVowb/Fsh/OH2Vt37rxn3KTuOT0XZWSGscpolaixcs0sY5WLAtiq82h3dK8Gplevas8HdaxHeyeGD6/6Q00hijxpDXUVn2Mr3teVPPRqVKcmf9QkWZVDaKQqq3ve8O4NHcUXO5pvcbWYTY3IMrlmkskqy1iKi7TpqS4VjuRbANwDgh225AehaifGkY9CvWqzFEtTQ1lwlQgAtA5K9gO4FqqOoH3B/nmMmz3Nwy8Vb5xG8i+bI0Xz57LLWIAWoE0B4UVT0d189FsGBAZE10E+jVT9l/ZUSS9k19Z4rZ0zRkiA3E8Bi8BfTLibgZuvHV/XZgx219euxn8EXgQB1dYAW4uYLbvMfO7v1IECjPbRUeLLLxWPXCmCLFtgKCsvJE/g4gG0rY4W4xHgw3j5Flx6hr1PGA32zjqqC89dZKNF52djeHfEY7VD0rV4h/EN1FwF4QkbscpYytRSiQB8QDFAlo5R8VH6H/k7t8z+J6gCJ/WqRhdpTfGAgmXIwjxPd2rFCraULL0IWI2I1NB/wSMFE2S7/B0dkODci9GKYgAAAABJRU5ErkJggg==" sizes="16x16">

        <title>CrowdStrike Toucan | tailwind-config-viewer</title>

        <script>
          window.__TCV_CONFIG = {
            configPath: './${config}'
          }
        </script>

        ${cssFiles.map((file) => `<link href='css/${file}' rel=preload as=style>`).join('\n')}
        ${jsFiles.map((file) => `<link href='js/${file}' rel=preload as=script>`).join('\n')}

        ${cssFiles.map((file) => `<link href='css/${file}' rel=stylesheet>`).join('\n')}

        <!--
        Original Content for reference
        <link href=css/app.aac7915f.css rel=preload as=style>
        <link href=js/app.8fe5358b.js rel=preload as=script>
        <link href=js/chunk-vendors.d4b2e20c.js rel=preload as=script>
        <link href=css/app.aac7915f.css rel=stylesheet>
        -->
      </head>
      <body class="theme-light">
        <div class="p-2">
          <a class="underline interactive-link" href="/manual">View Manual Tests</a>
        </div>

        <noscript><strong>We're sorry but tailwind-config-viewer doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript>
        <div id=app></div>

        <!--
        Original Content for reference
        <script src=js/chunk-vendors.d4b2e20c.js></script>
        <script src=js/app.8fe5358b.js></script>
        -->
        ${jsFiles
          .sort()
          .reverse()
          .map((file) => `<script src='js/${file}'></script>`)
          .join('\n')}

        <script type="text/javascript">
          // The default dark/light mode toggle does not use the Toucan theme colors.
          // See comment above about needing to re-write this tool into something toucan-based.
          //
          // This script monitors the body class for changes and adds or removes the
          // appropriate Toucan theme class
          let observer = new MutationObserver((mutationList) => {
            for (let mutation of mutationList) {
              if (mutation.type !== 'attributes') continue;
              if (mutation.attributeName !== 'class') continue;

              let classList = mutation.target.classList;
              if (classList.contains('mode-dark')) {
                if (classList.contains('theme-dark')) continue;

                classList.remove('theme-light');
                classList.add('theme-dark');

                continue;
              }

              if (classList.contains('theme-light')) continue;

              classList.remove('theme-dark');
              classList.add('theme-light');
            }
          });

          observer.observe(document.body, { attributes: true, childList: false, subtree: false });
        </script>
      </body>
    </html>`
  );
}

main();

// --------------------------------------
//

async function crawlFiles(dirPath, perform) {
  let dir = await fs.opendir(dirPath);

  for await (let child of dir) {
    let childFSName = child.name;
    let childPath = path.join(dirPath, childFSName);

    if (child.isDirectory()) {
      await crawlFiles(childPath, perform);
      continue;
    }

    let childName = path.basename(childPath, path.extname(childPath));

    await perform({
      containingFolderName: path.basename(dirPath),
      directory: dirPath,
      filePath: childPath.toString(),
      fileName: childFSName,
      moduleName: childName,
    });
  }
}
