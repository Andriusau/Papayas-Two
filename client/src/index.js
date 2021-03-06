import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { render } from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import {
//     HashRouter,
//     Route,
//     Switch
// } from 'react-router-dom';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

ReactDOM.render( < App / > , document.getElementById('root'));
registerServiceWorker();