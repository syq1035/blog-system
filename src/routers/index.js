import React from 'react'
import { BrowserRouter, Route, Redirect , Switch } from "react-router-dom";
import Login from '../pages/login/index'
import Home from '../pages/home/index'
import Editor from '../pages/editor/index'

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
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    )
  }
}