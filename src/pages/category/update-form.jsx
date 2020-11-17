import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd'

const Option = Select.Option
export default class UpdateForm extends Component {
  formRef = React.createRef()
  addCategory() {
    console.log(this.formRef.current)
  }
  render() {
    return (
      <Form ref={this.formRef} onFinish={this.addCategory}>
        <Form.Item
          rules={[
            {
              required: true,
              message: '请输入名称'
            }
          ]}
          name='name'
          initialValue='a'
        >
          <Input placeholder='请输入分类名称' />
        </Form.Item>
      </Form>
    )
  }
}
