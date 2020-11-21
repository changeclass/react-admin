import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import PropType from 'prop-types'
export default class userForm extends Component {
  propType = {
    setForm: PropType.func
  }
  static propTypes = {
    setForm: PropType.func.isRequired, // 用来传递form对象的函数
    roles: PropType.array.isRequired,
    user: PropType.object
  }
  formRef = React.createRef()
  componentDidMount() {
    this.props.setForm(this.formRef.current)
    this.formRef.current.setFieldsValue({
      ...this.props.user
    })
  }
  componentDidUpdate() {
    this.formRef.current.setFieldsValue({
      ...this.props.user
    })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 15 } // 右侧包裹的宽度
    }
    const { roles, user } = this.props

    return (
      <Form ref={this.formRef}>
        <Form.Item
          initialValue=''
          rules={[{ required: true, message: '请输入用户名！' }]}
          name='username'
          label='用户名'
          {...formItemLayout}
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        {user._id ? null : (
          <Form.Item
            initialValue=''
            rules={[{ required: true, message: '请输入密码！' }]}
            name='password'
            label='密码'
            {...formItemLayout}
          >
            <Input placeholder='请输入密码' type='password' />
          </Form.Item>
        )}

        <Form.Item
          initialValue=''
          rules={[{ required: true, message: '请输入手机号！' }]}
          name='phone'
          label='手机号'
          {...formItemLayout}
        >
          <Input placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item
          initialValue=''
          rules={[{ required: true, message: '请输入邮箱！' }]}
          name='email'
          label='邮箱'
          {...formItemLayout}
        >
          <Input placeholder='请输入邮箱' type='email' />
        </Form.Item>
        <Form.Item
          initialValue=''
          rules={[{ required: true, message: '请选择角色' }]}
          name='role_id'
          label='角色'
          {...formItemLayout}
        >
          <Select>
            {roles.map((role) => (
              <Select.Option key={role._id} value={role._id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    )
  }
}
