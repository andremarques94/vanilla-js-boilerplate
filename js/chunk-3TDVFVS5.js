var o;async function u(n,e){(await import(`/js/pages/${e}.js`)).render(n)}function c({path:n,page:e}){o.currentPath.path=n,o.currentPath.page=e}function p(n){let e=Object.keys(o).find(r=>o[r].path===n);return o[e]||o.home}function i({page:n}){let e=document.querySelector("#app"),t=document.createElement("div");e.innerHTML="",e.appendChild(t),u(t,n)}function a(n,e=!1){let t=p(n);c(t),e?history.replaceState(t,"",t.path):history.pushState(t,"",t.path),i(t)}function s(n){o=n;let e=document.location.pathname;a(e,!0),window.onpopstate=({state:t})=>a(t.path,!0)}var h={init:s};export{a,h as b};
