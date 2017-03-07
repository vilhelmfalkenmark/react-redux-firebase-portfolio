import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./Store";
import '../css/stylesheet.css';
import 'react-select/dist/react-select.css';
console.log('%c Hallå där!', 'background: rgb(0,166,191); color: #ffffff');


ReactDOM.render(
 <Provider store={store} >
   <App />
 </Provider>,
  document.getElementById('React-root')
);
