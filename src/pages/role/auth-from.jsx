import React, { Component } from 'react'
import { Input, Tree } from 'antd'
import menuList from '../../config/menuConfig'
import PropType from 'prop-types'

export default class AuthForm extends Component {
  propType = {
    role: PropType.object
  }
  state = {
    checkedKeys: []
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
  componentDidMount() {
    this.treeNodes = this.getTreeNodes(menuList)
    // console.log(this.treeNodes)
  }
  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    })
  }
  getMenus = () => this.state.checkedKeys
  render() {
    const { role } = this.props
    const { checkedKeys } = this.state

    console.log(this.treeNodes)
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
