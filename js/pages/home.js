function render(elem) {
    elem.style = 'width:100%; height:100%;display:flex;justify-content:center;align-items:center;';
    elem.innerHTML = `<div style="text-align: center;">
      <h1>BOILERPLATE FOR VANILLA-JS</h1>
      <br>
      <h2>USING ESBUILD</h2>
      <br>
      <br>
      <h2>To get started, edit <code>js/app.js</code> and save to reload.</h2>
      <br>
      <h2>Happy coding!</h2>
    </div>`;
}

export { render };
