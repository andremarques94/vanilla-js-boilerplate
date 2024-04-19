import { context } from 'esbuild';
import { rmSync } from 'fs';
import process from 'node:process';
import path from 'path';
import { DEV_DIR, BUILD_DIR } from './commons/commons.js';

const publicDir = path.join(DEV_DIR, BUILD_DIR);

const staticAssetsBuild = await context({
    entryPoints: ['index.html', 'favicon/*'],
    loader: {
        '.ico': 'copy',
        '.png': 'copy',
        '.html': 'copy',
        '.svg': 'copy',
        '.webmanifest': 'copy',
        '.xml': 'copy'
    },
    outdir: `${publicDir}`
});

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
    entryPoints: ['js/app.js'],
    format: 'esm',
    bundle: true,
    logLevel: 'info',
    outdir: `${path.join(publicDir, 'js')}`
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
