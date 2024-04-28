function render(elem) {
    elem.style = 'width:100%; height:100%;display:flex;justify-content:center;align-items:center;';
    elem.innerHTML = `<div style="text-align: center;">
      <img src="./assets/shameless.png" style="width: 300px; height: 300px; margin-bottom: 20px;">
      <h1>BOILERPLATE FOR VANILLA-JS APPS</h1>
      <h2>USING ESBUILD</h2>
      <br>
      <br>
      <h2>TEST ACTION</h2>
      <h2>To get started, add a new file to <code>js/pages</code> and save to reload.</h2>
      <br>
      <h2>Happy coding!</h2>
    </div>`;
}

export { render };
