import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd'
import PropTypes from 'prop-types'

export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired
  }
  formRef = React.createRef()

  componentDidMount() {
    // console.log(this.props)
    // 将form对象通过setForm传递给父组件
    // this.props.categoryName = this.formRef.current.getFieldValue('name')
    // console.log(this.formRef.current)
    // this.formRef.current.resetFields()

    this.props.setForm(this.formRef.current)
    this.formRef.current.setFieldsValue({
      name: this.props.categoryName
    })
  }
  componentDidUpdate() {
    this.formRef.current.setFieldsValue({
      name: this.props.categoryName
    })
  }
  render() {
    const { categoryName } = this.props

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
          initialValue={categoryName}
        >
          <Input placeholder='请输入分类名称' />
        </Form.Item>
      </Form>
    )
  }
}
