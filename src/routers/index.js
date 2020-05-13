import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from '../pages/home'
import Editor from '../pages/editor'
import Admin from '../pages/admin'
import Detail from '../pages/detail';
import User from '../pages/user';
import Search from '../pages/search'
import Setting from '../pages/setting';

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
          <Route
            path="/setting"
            component={Setting}
          />
          <Route
            path="/admin"
            component={Admin}
          />
          <Redirect to='/home' />
        </Switch>
      </BrowserRouter>
    )
  }
}