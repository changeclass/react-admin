/**
 * 管理的路由组件
 */
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
// 路由组件
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
// 图表
import Bar from '../charts/bar' // 柱状图
import Line from '../charts/line' // 折线图
import Pie from '../charts/pie' // 饼状图

const { Footer, Sider, Content } = Layout

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    // 判断是否存在user
    if (!user || !user._id) {
      // 没有登录，自动跳转
      return <Redirect to='/login' />
    } else {
      return (
        <Layout style={{ height: '100%' }}>
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header> Hello {user.username}</Header>
            <Content style={{ backgroundColor: '#fff' }}>
              <Switch>
                <Route path='/home' component={Home} />
                <Route path='/category' component={Category} />
                <Route path='/product' component={Product} />
                <Route path='/role' component={Role} />
                <Route path='/user' component={User} />
                <Route path='/charts/bar' component={Bar} />
                <Route path='/charts/line' component={Line} />
                <Route path='/charts/pie' component={Pie} />
                <Redirect to='/home'></Redirect>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center', color: '#ccc' }}>
              推荐使用咕咕浏览器获得极致体验
            </Footer>
          </Layout>
        </Layout>
      )
    }
  }
}
