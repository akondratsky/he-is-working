import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));

const PWD = 'IDDQD';
let isEnabled = false;
let current = 0;

window.addEventListener('keypress', ({ key }) => {
    if (key.toUpperCase() === PWD[current]) {
        current++;
    } else {
        current = 0;
    }
    if (current === PWD.length) {
        isEnabled = !isEnabled;
        window.cheat(isEnabled);
        current = 0;
    }
});