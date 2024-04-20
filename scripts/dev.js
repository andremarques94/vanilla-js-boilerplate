import { context } from 'esbuild';
import { rmSync } from 'fs';
import process from 'node:process';
import path from 'path';
import { DEV_DIR, BUILD_DIR } from './commons/commons.js';
import buildRoutesPlugin from './esbuild-plugins/build-routes.js';

const publicDir = path.join(DEV_DIR, BUILD_DIR);

const buildCss = await context({
    entryPoints: ['css/*.css'],
    bundle: true,
    external: ['/*'],
    loader: {
        '.png': 'copy',
        '.jpg': 'copy',
        '.svg': 'dataurl'
    },
    outdir: `${path.join(publicDir, 'css')}`
});

const buildJs = await context({
    entryPoints: ['js/app.js', 'js/**/*.js'],
    format: 'esm',
    bundle: true,
    logLevel: 'info',
    plugins: [
        buildRoutesPlugin({
            src: `${path.join(publicDir, 'js', 'pages')}`,
            dest: `${path.join(publicDir, 'js')}`,
            file: 'routes.json'
        })
    ],
    outdir: `${path.join(publicDir, 'js')}`
});

const staticAssetsBuild = await context({
    entryPoints: ['index.html', 'favicon/*', 'assets/*'],
    loader: {
        '.ico': 'copy',
        '.jpg': 'copy',
        '.jpeg': 'copy',
        '.png': 'copy',
        '.html': 'copy',
        '.svg': 'copy',
        '.webmanifest': 'copy',
        '.xml': 'copy'
    },
    outdir: `${publicDir}`
});

//Setting up for cleanup when process is interrupted
process.on('SIGINT', () => {
    console.log(`\nDeleting ${path.resolve(DEV_DIR)} directory and exiting...`);
    rmSync(path.resolve(DEV_DIR), { recursive: true });
    process.exit(0);
});

await Promise.all([buildJs.watch(), staticAssetsBuild.watch(), buildCss.watch()]);
await buildJs.serve({
    servedir: `${publicDir}`,
    fallback: `${publicDir}/index.html`
});
