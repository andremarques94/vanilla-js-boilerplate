let routes;

/**
 *
 * @param {string} controllerName
 * imports and init a controller
 */
async function launchPage(domElement, pageName) {
    const page = await import(`/js/pages/${pageName}.js`);
    page.render(domElement);
}

/**
 *
 * @param {Object} route
 * Sets the current route
 */
function setCurrentRoute({ path, page }) {
    routes.currentPath.path = path;
    routes.currentPath.page = page;
}

/**
 *
 * @param {string} path the path to search for
 * @returns the route that matches the URL path or the home route
 */
function getRoute(path) {
    const routeKey = Object.keys(routes).find(key => routes[key].path === path);
    const route = routes[routeKey] || routes.home;
    return route;
}

//Render function
//path may be useful for some controllers
function render({ page }) {
    const root = document.querySelector('#app');
    const domElement = document.createElement('div');
    root.innerHTML = '';
    root.appendChild(domElement);

    launchPage(domElement, page);
}

/**
 *
 * @param {string} path where to navigate
 * @param {boolean} initialFullPageLoad initial page load
 * @param {object} state state obj
 * @returns
 */
export function navigate(path, initialFullPageLoad = false) {
    const route = getRoute(path);

    setCurrentRoute(route);
    initialFullPageLoad
        ? history.replaceState(route, '', route.path)
        : history.pushState(route, '', route.path);
    render(route);
}

/**
 * Router init
 */
function init(routesObject) {
    routes = routesObject;
    const path = document.location.pathname;

    navigate(path, true);
    window.onpopstate = ({ state }) => navigate(state.path, true);
}

export default { init };
