import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd'
const Item = Form.Item
const Option = Select.Option
export default class AddForm extends Component {
  formRef = React.createRef()
  addCategory() {
    console.log(this.formRef.current)
  }
  render() {
    return (
      <Form ref={this.formRef} onFinish={this.addCategory}>
        <Form.Item name='parentId'>
          <Select style={{ width: '100%' }} defaultValue='0'>
            <Option value='0'>一级分类</Option>
            <Option value='1'>电脑</Option>
            <Option value='2'>哈哈</Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: '请输入名称'
            }
          ]}
          name='name'
        >
          <Input placeholder='请输入分类名称' />
        </Form.Item>
      </Form>
    )
  }
}
