import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker'

import 'antd/dist/antd.css'
import './assets/css/index.sass'
import AppRouter from './routers'
import reducers from './store/index'
// import './config'
// import App from './App';

let storeEnhancers = compose(
  applyMiddleware(thunk),
  (window && window.devToolsExtension) ? window.devToolsExtension() : (f) => f,
);
const store = createStore(reducers, storeEnhancers)

ReactDOM.render(
  ( <Provider store={store}>
      <AppRouter />
    </Provider>), 
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
