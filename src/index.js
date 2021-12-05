import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import './index.css';
import App from './App';

ReactDOM.render(
  //Provider - parent of everything inside the application
  //allows to get access to all the thing related to the store
    <Provider store={store} > 
      <BrowserRouter>
       <App />
      </BrowserRouter>
    </Provider>

  ,
  document.getElementById('root')
);

