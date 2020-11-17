/**
 * 管理的路由组件
 */
import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'

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
            <Content style={{ backgroundColor: '#fff' }}>Content</Content>
            <Footer style={{ textAlign: 'center', color: '#ccc' }}>
              推荐使用咕咕浏览器获得极致体验
            </Footer>
          </Layout>
        </Layout>
      )
    }
  }
}
