import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'
const Option = Select.Option
export default class AddForm extends Component {
  formRef = React.createRef()
  static propTypes = {
    // 一级分类数组
    categorys: PropTypes.array.isRequired,
    // 父分类ID
    parentId: PropTypes.string.isRequired,
    // 传递form对象
    setForm: PropTypes.func
  }

  componentDidMount() {
    this.props.setForm(this.formRef.current)
  }
  render() {
    const { categorys, parentId } = this.props
    return (
      <Form ref={this.formRef} onFinish={this.addCategory}>
        <Form.Item name='parentId' initialValue={parentId}>
          <Select style={{ width: '100%' }}>
            <Option value='0'>一级分类</Option>
            {categorys.map((item) => {
              return (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: '请输入名称'
            }
          ]}
          name='categoryName'
        >
          <Input placeholder='请输入分类名称' />
        </Form.Item>
      </Form>
    )
  }
}
