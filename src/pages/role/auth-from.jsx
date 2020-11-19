import React, { Component } from 'react'
import { Input, Tree } from 'antd'
import menuList from '../../config/menuConfig'
import PropType from 'prop-types'

export default class AuthForm extends Component {
  propType = {
    role: PropType.object
  }
  state = {
    checkedKeys: [],
    edit: false
  }
  formRef = React.createRef()
  getTreeNodes = (menuList) => {
    return [{ title: '平台', key: 'all', children: menuList }]
  }
  constructor(props) {
    super(props)
    const { menus } = this.props.role
    this.state = {
      checkedKeys: menus
    }
    this.treeNodes = this.getTreeNodes(menuList)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(prevState)
  //   //该方法内禁止访问this
  //   if (nextProps.role.menus !== prevState.checkedKeys) {
  //     //通过对比nextProps和prevState，返回一个用于更新状态的对象
  //     return {
  //       checkedKeys: nextProps.role.menus
  //     }
  //   }
  //   //不需要更新状态，返回null
  //   return null
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('nextProps', nextProps.role.menus)
  //   console.log('prevState', prevState.checkedKeys)
  //   if (nextProps.role.menus !== prevState.checkedKeys) {
  //     //通过对比nextProps和prevState，返回一个用于更新状态的对象
  //     // nextProps.role.menus = prevState.checkedKeys
  //     return {
  //       checkedKeys: nextProps.role.menus
  //     }
  //   }
  // }
  // shouldComponentUpdate(nextProps, prevState) {
  //   console.log(nextProps, prevState)
  //   return nextProps.role.menus !== prevState.checkedKeys
  // }
  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    })
  }
  getMenus = () => this.state.checkedKeys
  render() {
    const { role } = this.props
    const { checkedKeys } = this.state
    return (
      <div>
        <Input addonBefore='角色名称' disabled value={role.name} />

        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
          treeData={this.treeNodes}
        />
      </div>
    )
  }
}
