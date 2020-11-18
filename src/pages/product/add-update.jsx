import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
// import PicturesWall from './pictures-wall'
// import RichTextEditor from './rich-text-editor'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddOrUpdateProduct } from '../../api'

const { Item } = Form
const { TextArea } = Input

// Product的添加和更新的子路由组件
export default class ProductAddUpdate extends Component {
  formRef = React.createRef()
  // 价格的验证规则
  validatorPrice = (item, value) => {
    if (value >= 0 && value <= 999999999) {
      return Promise.resolve()
    } else {
      return Promise.reject('？？？')
    }
  }
  handleSubmit = () => {
    // 表单对象
    const form = this.formRef.current
  }
  render() {
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>
        <span>添加商品</span>
      </span>
    )
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }
    return (
      <Card title={title}>
        <Form
          {...formItemLayout}
          ref={this.formRef}
          onFinish={this.handleSubmit}
        >
          <Item
            label='商品名称：'
            rules={[{ required: true, message: '请输入商品名称' }]}
            name='name'
          >
            <Input placeholder='商品名称' />
          </Item>
          <Item
            label='商品描述：'
            name='desc'
            rules={[{ required: true, message: '请输入商品描述' }]}
          >
            <TextArea
              placeholder='商品名称'
              autoSize={{ minRows: 2, maxRows: 5 }}
            />
          </Item>
          <Item
            label='商品价格：'
            name='price'
            rules={[
              { required: true, message: '请输入商品价格' },
              { validator: this.validatorPrice }
            ]}
          >
            <Input type='number' placeholder='商品价格' addonAfter='元' />
          </Item>
          <Item label='商品分类'>
            <Input placeholder='商品分类' addonAfter='元' />
          </Item>
          <Item label='商品图片' name='imgs'>
            <Input placeholder='商品价格' addonAfter='元' />
          </Item>
          <Item label='商品详情' name='detail'>
            <Input placeholder='商品价格' addonAfter='元' />
          </Item>
          <Item>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
