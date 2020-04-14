import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from '../pages/home'
import Editor from '../pages/editor'
import Admin from '../pages/admin'
import Detail from '../pages/detail';
import User from '../pages/user';
import Search from '../pages/search'

export default class AppRouter extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
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
          <Route
            path='/user/'
            component={User}
          />
          <Route
            path='/search'
            component={Search}
          />
          <Redirect to='/home' />
        </Switch>
      </BrowserRouter>
    )
  }
}