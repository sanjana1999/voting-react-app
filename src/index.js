import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Auth from './Auth';
import Home from "./Home";
import Addpost from "./component/Addpost";

import {createStore} from "redux";
import {Provider} from "react-redux";
import allReducers from "./redux-reducers/reducers";

const store = createStore(
                  allReducers,
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/home" component={Home} />
          <Route path="/addpost" component={Addpost} />
      </Switch>
      <Redirect from="/" to="/auth" />
    </BrowserRouter>
  </Provider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
