function render(elem) {
    elem.style = 'width:100%; height:100%;display:flex;justify-content:center;align-items:center;';
    elem.innerHTML = `<div style="text-align: center;">
    <h1>TEST ROUTE</h1>
    <h2><code>/test-route/detail</code></h2>
    </div>`;
}

export { render };
