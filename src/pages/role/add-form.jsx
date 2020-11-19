import React, { Component } from 'react'
import { Form, Input } from 'antd'

export default class AddForm extends Component {
  propType
  render() {
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 15 } // 右侧包裹的宽度
    }

    return (
      <Form>
        <Form.Item
          initialValue=''
          rules={[{ required: true, message: 'Please input your username!' }]}
          name='roleName'
          label='角色名称'
          {...formItemLayout}
          ref={this.addFormRef}
        >
          <Input placeholder='请输入角色名称' />
        </Form.Item>
      </Form>
    )
  }
}
