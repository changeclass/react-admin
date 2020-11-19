import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropType from 'prop-types'
export default class AddForm extends Component {
  propType = {
    setForm: PropType.func
  }
  formRef = React.createRef()
  componentDidMount() {
    this.props.setForm(this.formRef.current)
  }
  render() {
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 15 } // 右侧包裹的宽度
    }
    return (
      <Form ref={this.formRef}>
        <Form.Item
          initialValue=''
          rules={[{ required: true, message: '请输入角色名称！' }]}
          name='roleName'
          label='角色名称'
          {...formItemLayout}
        >
          <Input placeholder='请输入角色名称' />
        </Form.Item>
      </Form>
    )
  }
}
