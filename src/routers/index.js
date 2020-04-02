import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from '../pages/login/index'
import Home from '../pages/home/index'
import Editor from '../pages/editor/index'
import Admin from '../pages/admin/index'
import Detail from '../pages/detail/index';

export default class AppRouter extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            component={Login}
          />
          <Route
            path="/home"
            component={Home}
          />
          <Route
            path="/editor"
            component={Editor}
          />
          <Route
            path="/admin"
            component={Admin}
          />
          <Route
            path="/article/"
            component={Detail}
          />
          <Redirect to='/home' />
        </Switch>
      </BrowserRouter>
    )
  }
}