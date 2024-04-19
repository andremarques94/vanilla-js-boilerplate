import routes from './routes.js';

async function launchController(controllerName) {
    try {
        const module = await import(`/js/controler/${controllerName}.js`);
        module.default.init();
    } catch (error) {
        console.error(error);
    }
}

function setCurrentRoute({ path, controller }) {
    routes.currentPath.path = path;
    routes.currentPath.controller = controller;
}

function navigate(path) {
    if (path === routes.currentPath.path) {
        return;
    }

    const routeKey = Object.keys(routes).find(key => routes[key].path === path);
    const route = routes[routeKey] || routes.home;

    setCurrentRoute(route);
    launchController(route.controller);
}

function getPath(urlStr) {
    return new URL(urlStr).hash.slice(1);
}

function navigateOnHashChange() {
    addEventListener('hashchange', function (e) {
        const path = getPath(e.newURL);
        navigate(path);
    });
}

function buildNav() {
    const nav = document.querySelector('#anchors');
    Object.keys(routes)
        .map(key => {
            const a = document.createElement('a');
            a.setAttribute('href', `#${routes[key].path}`);
            a.setAttribute('id', `${key}-href`);
            a.textContent = key.toUpperCase();
            return a;
        })
        .forEach(anchor => nav.appendChild(anchor));
}

function init() {
    window.location.hash = window.location.hash || routes.home.path;

    buildNav();
    navigate(getPath(window.location.href));
    navigateOnHashChange();
}

export default { init };
