import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HomePage from './templates/HomeIndex.js';

ReactDOM.render(<HomePage />, document.getElementById('root'));
serviceWorker.unregister();
