import { build } from 'esbuild';
import path from 'path';
import { BUILD_DIR } from './commons/commons.js';

await build({
    entryPoints: ['css/*.css'],
    bundle: true,
    minify: true,
    external: ['/*'],
    loader: {
        '.png': 'copy',
        '.jpg': 'copy',
        '.svg': 'dataurl'
    },
    outdir: `${path.join(BUILD_DIR, '/css')}`
});

await build({
    entryPoints: ['index.html', 'favicon/*'],
    loader: {
        '.ico': 'copy',
        '.png': 'copy',
        '.html': 'copy',
        '.svg': 'copy',
        '.webmanifest': 'copy',
        '.xml': 'copy'
    },
    outdir: `${path.resolve(BUILD_DIR)}`
});

await build({
    entryPoints: ['js/app.js', 'js/**/*.js'],
    format: 'esm',
    bundle: true,
    minify: true,
    splitting: true,
    treeShaking: true,
    loader: { '.html': 'text' },
    drop: ['debugger', 'console'],
    dropLabels: ['DEV'],
    logLevel: 'info',
    outdir: `${path.join(BUILD_DIR, '/js')}`
});
