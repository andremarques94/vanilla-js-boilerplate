import { context } from 'esbuild';
import { rmSync } from 'fs';
import process from 'node:process';
import path from 'path';
import { BUILD_DIR } from './commons/commons.js';

const outDir = path.join('./out');
const publicDir = path.join(outDir, BUILD_DIR);

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
    entryPoints: ['app.js'],
    format: 'esm',
    bundle: true,
    logLevel: 'info',
    outdir: `${publicDir}`
});

//Setting up for cleanup when process is interrupted
process.on('SIGINT', () => {
    console.log(`\nDeleting ${outDir} directory and exiting...`);
    rmSync(outDir, { recursive: true });
    console.log(buildJs);
    process.exit(0);
});

await Promise.all([buildJs.watch(), staticAssetsBuild.watch(), buildCss.watch()]);
await buildJs.serve({
    servedir: `${publicDir}`,
    fallback: `${publicDir}/index.html`
});
