import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createFromIconfontCN } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'

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

class LeftNav extends Component {
  constructor(props) {
    super(props)
    this.menuNodes = this.getMenuNodes(menuList)
  }
  // 根据menu的数据数组生成对应的标签数组
  getMenuNodes_map = (menuList) => {
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
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      // 向pre中添加
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <IconFont type={item.icon} />
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        const cItem = item.children.find((cItem) => cItem.key === path)
        // 如果存在
        if (cItem) this.openKey = item.key

        pre.push(
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
      return pre
    }, [])
  }
  com
  render() {
    // const menuNodes = this.getMenuNodes(menuList)
    const path = this.props.location.pathname
    // 需要打开菜单的key
    const openKey = this.openKey

    return (
      <div className='left-nav'>
        <Link className='left-nav-header' to='/home'>
          <img src={logo} alt='logo' />
          <h1>谷粒后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode='inline'
          theme='dark'
        >
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}
// 通过使用withRouter包装获取路由
export default withRouter(LeftNav)
