import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'antd'
import { PieChartOutlined, MailOutlined } from '@ant-design/icons'

import './index.less'
import logo from '../../assets/images/logo.png'

const { SubMenu } = Menu
// 左侧导航组件
export default class LeftNav extends Component {
  render() {
    return (
      <div className='left-nav'>
        <Link className='left-nav-header' to='/home'>
          <img src={logo} alt='logo' />
          <h1>谷粒后台</h1>
        </Link>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
          theme='dark'
          // inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key='1' icon={<PieChartOutlined />}>
            首页
          </Menu.Item>

          <SubMenu key='sub1' icon={<MailOutlined />} title='商品'>
            <Menu.Item key='5' icon={<MailOutlined />}>
              品类管理
            </Menu.Item>
            <Menu.Item key='6' icon={<MailOutlined />}>
              商品管理
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
