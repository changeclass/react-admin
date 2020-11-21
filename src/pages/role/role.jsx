import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import { PAGE_SIZE } from '../../utils/constants'
import memoryUtiles from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-from'
// 角色管理路由
export default class Role extends Component {
  state = {
    roles: [], // 所有角色的列表
    role: {}, // 选中的role
    isShowAdd: false, // 是否显示添加界面
    isShowAuth: false // 是否显示设置权限界面
  }

  constructor(props) {
    super(props)

    this.auth = React.createRef()
  }
  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ]
  }
  // 获取角色信息
  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }
  onRow = (role) => {
    return {
      onClick: (event) => {
        // 点击行
        // console.log('row onClick()', role)
        // alert('点击行')
        this.setState({
          role
        })
      }
    }
  }
  addRole = async () => {
    this.form
      .validateFields()
      .then(async (result) => {
        const res = await reqAddRole(result.roleName)
        if (res.status !== 0) return message.error('错误了')
        // this.getRoles()
        const role = res.data
        this.setState((state) => ({
          roles: [...state.roles, role],
          isShowAdd: false
        }))
      })
      .catch((err) => {
        message.error('请先填写字段！')
      })
  }
  // 更新角色的回调函数
  updateRole = async () => {
    const role = this.state.role
    // 得到最新的menus
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_name = memoryUtiles.user.username
    role.auth_time = Date.now()
    const result = await reqUpdateRole(role)
    if (result.status !== 0) return message.error('错误了！')

    if (role._id === memoryUtiles.user.role_id) {
      memoryUtiles.user = {}
      storageUtils.removeUser()
      message.success('当前角色权限修改了，请重新登录')
      this.props.history.replace('/login')
    } else {
      message.success('权限更新成功！')
      this.setState({
        isShowAuth: false,
        roles: [...this.state.roles]
      })
    }
  }
  componentDidMount() {
    this.initColumn()
    this.getRoles()
  }
  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state
    const title = (
      <span>
        <Button
          type='primary'
          onClick={() => this.setState({ isShowAdd: true })}
        >
          创建角色
        </Button>
        &nbsp;&nbsp;
        <Button
          type='primary'
          disabled={!role._id}
          onClick={() => this.setState({ isShowAuth: true })}
        >
          设置角色权限
        </Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              // 选择某个radio时回调
              this.setState({
                role
              })
            }
          }}
          onRow={this.onRow}
        />
        <Modal
          title='添加角色'
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false })
            this.form.resetFields()
          }}
        >
          <AddForm setForm={(form) => (this.form = form)} />
        </Modal>

        <Modal
          title='设置角色权限'
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <AuthForm ref={this.auth} role={role} />
        </Modal>
      </Card>
    )
  }
}
