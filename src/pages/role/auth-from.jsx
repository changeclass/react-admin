import React, { Component } from 'react'
import { Input, Tree, Form } from 'antd'
import menuList from '../../config/menuConfig'
import PropType from 'prop-types'

export default class AuthForm extends Component {
  propType = {
    role: PropType.object
  }
  formRef = React.createRef()
  getTreeNodes = (menuList) => {
    return [{ title: '平台', key: 'all', children: menuList }]
  }
  constructor(props) {
    super(props)
    this.state = {
      checkedKeys: [],
      // 记录当前角色对象
      role: []
    }
    this.treeNodes = this.getTreeNodes(menuList)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // 判断传入对象与当前记录的对象是否是同一个对象
    if (nextProps.role !== prevState.role) {
      return {
        // 将刚传入的值赋值给已保存的值
        checkedKeys: nextProps.role.menus,
        role: nextProps.role
      }
    }
    return null
  }

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys })
  }
  getMenus = () => this.state.checkedKeys
  render() {
    const { role } = this.props
    const { checkedKeys } = this.state
    return (
      <div>
        <Form>
          <Form.Item label='角色名称'>
            <Input value={role.name} readOnly></Input>
          </Form.Item>
        </Form>
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
