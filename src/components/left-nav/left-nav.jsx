import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createFromIconfontCN } from '@ant-design/icons'

import { Menu } from 'antd'
import { PieChartOutlined, MailOutlined } from '@ant-design/icons'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig.js'

// 子集菜单
const { SubMenu } = Menu
// 阿里iconfont
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2208178_anairh40jgh.js'
})
// 左侧导航组件
export default class LeftNav extends Component {
  // 根据menu的数据数组生成对应的标签数组

  getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <IconFont type={item.icon} />
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={item.title}
            icon={<IconFont type={item.icon} />}
          >
            {/* 递归调用 */}
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  render() {
    return (
      <div className='left-nav'>
        <Link className='left-nav-header' to='/home'>
          <img src={logo} alt='logo' />
          <h1>谷粒后台</h1>
        </Link>
        <Menu
          defaultSelectedKeys={['/home']}
          defaultOpenKeys={['/home']}
          mode='inline'
          theme='dark'
        >
          {this.getMenuNodes(menuList)}
          {/* <Menu.Item key='/home'>
            <IconFont type='icon-tuichu' />
            <Link to='/home'>首页</Link>
          </Menu.Item>

          <SubMenu key='sub1' title='商品'>
            <Menu.Item key='/category' icon={<MailOutlined />}>
              <Link to='/category'>品类管理</Link>
            </Menu.Item>
            <Menu.Item key='/product' icon={<MailOutlined />}>
              <Link to='/product'>商品管理</Link>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    )
  }
}
