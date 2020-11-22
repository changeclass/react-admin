/**
 * 应用根组件
 */

import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Admin from './pages/admin/admin';
import Login from './pages/login/login';


export default class App extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </HashRouter>
    )
  }
}
