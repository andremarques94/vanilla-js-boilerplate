import fs from 'fs/promises';
import nodepath from 'path';

const getDirectories = async source => {
    const result = await fs.readdir(source, { withFileTypes: true, recursive: true });

    return result
        .filter(dirent => dirent.name.includes('.js') && !dirent.isDirectory())
        .map(dirent => (dirent.path + '/' + dirent.name).replace(source, ''))
        .map(path => path.replace('.js', ''))
        .reduce(
            (acc, path) => {
                const route = {
                    path,
                    page: path
                };

                acc[nodepath.basename(route.page)] = route;
                return acc;
            },
            {
                currentPath: {
                    path: '',
                    page: ''
                }
            }
        );
};

export default ({ src, dest, file }) => {
    return {
        name: 'route-builder',
        setup(build) {
            build.onEnd(async () => {
                const routes = JSON.stringify(await getDirectories(src));

                await fs.mkdir(dest, { recursive: true });
                await fs.writeFile(`${nodepath.join(dest, file)}`, routes);
            });
        }
    };
};
