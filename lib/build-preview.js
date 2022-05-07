'use strict';

const path = require('path');
const fs = require('fs').promises;
const fse = require('fs-extra');
const execa = require('execa');
const { stripIndent } = require('common-tags');

const root = path.join(__dirname, '..');
const targetDir = path.join(root, 'dist');
const cssDir = path.join(targetDir, 'css');
const jsDir = path.join(targetDir, 'js');

async function main() {
  await execa(
    'node',
    [
      'node_modules/.bin/tailwind-config-viewer',
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
        <!--
          TODO: get toucan favicon
          <link rel=icon href=favicon.ico>
        -->
        
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
