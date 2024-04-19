new EventSource('/esbuild').addEventListener('change', () => window.location.reload());

window.addEventListener('DOMContentLoaded', () => {
    console.log('hi');
    console.log('DOM fully loaded and parsed');
});
