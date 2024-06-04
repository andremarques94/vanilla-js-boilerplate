import router from './router.js';

DEV: new EventSource('/esbuild').addEventListener('change', () => window.location.reload()); // eslint-disable-line no-unused-labels

window.addEventListener('DOMContentLoaded', async () => {
  const resp = await fetch('/js/routes.json');
  console.log('HELLO')
  const routes = await resp.json();
  router.init(routes);
});
