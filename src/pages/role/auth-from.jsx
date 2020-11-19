import React, { Component } from 'react'
import { Input, TreeSelect } from 'antd'
import menuList from '../../config/menuConfig'
import PropType from 'prop-types'

const { TreeNode } = TreeSelect
export default class AuthForm extends Component {
  propType = {
    role: PropType.object
  }
  formRef = React.createRef()
  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode value={item.key} title={item.title}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }
  componentDidMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }
  render() {
    const { role } = this.props
    // console.log(role)
    return (
      <div>
        <Input addonBefore='角色名称' disabled value={role.name} />
        <TreeSelect
          style={{ width: '100%' }}
          treeCheckable
          treeDefaultExpandAll
        >
          <TreeNode value='0' title='平台权限'>
            {this.treeNodes}
          </TreeNode>
        </TreeSelect>
      </div>
    )
  }
}
