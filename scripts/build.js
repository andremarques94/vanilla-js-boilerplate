import { build } from 'esbuild';
import path from 'path';
import buildRoutesPlugin from './esbuild-plugins/build-routes.js';
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
    drop: ['debugger'],
    dropLabels: ['DEV'],
    logLevel: 'info',
    plugins: [
        buildRoutesPlugin({
            src: `${path.join(BUILD_DIR, 'js', 'pages')}`,
            dest: `${path.join(BUILD_DIR, 'js')}`,
            file: 'routes.json'
        })
    ],
    outdir: `${path.join(BUILD_DIR, '/js')}`
});
