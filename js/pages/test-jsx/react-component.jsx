import React from 'react';
import { createRoot } from 'react-dom/client';
import HelloWorld from '../../jsx-components/hello-world.jsx';

function render(elem) {
    elem.style =
        'width:100%; height:100%;display:flex;justify-content:center;align-items:center; flex-direction: column;';

    const root = createRoot(elem);
    root.render(<HelloWorld />);
}

export { render };
