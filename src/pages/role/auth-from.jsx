import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd'
import PropTypes from 'prop-types'
import menuConfig from '../../config/menuConfig'

class AuthForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      treeData: menuConfig,
      checkedKeys: [],
      role: {}
    }
  }

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys })
  }

  getMenus = () => this.state.checkedKeys

  static getDerivedStateFromProps(nextProps, prevState) {
    const { role } = nextProps
    if (role._id !== prevState.role._id) {
      prevState.checkedKeys = role.menus
      prevState.role = role
    }
  }

  render() {
    const { role } = this.props
    return (
      <>
        <Form>
          <Form.Item label='角色名称'>
            <Input value={role.name} readOnly></Input>
          </Form.Item>
        </Form>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={this.state.checkedKeys}
          selectable={false}
          onCheck={this.onCheck}
          treeData={this.state.treeData}
        />
      </>
    )
  }
}

export default AuthForm
