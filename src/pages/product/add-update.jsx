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
  state = {
    options: []
  }
  // 价格的验证规则
  validatorPrice = (item, value) => {
    if (value >= 0 && value <= 999999999) {
      return Promise.resolve()
    } else {
      return Promise.reject('？？？')
    }
  }
  initOptions = (categorys) => {
    // 根据categorys数组生成options数组
    const options = categorys.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }))
    // 更新状态
    this.setState({ options })
  }
  // 获取一级/二级分类列表
  getCategorys = async (parentId) => {
    parentId = parentId || '0'
    const result = await reqCategorys(parentId)
    if (result.status !== 0) return message.error('分类获取失败')
    const categorys = result.data
    // 如果是一级分类
    if (parentId === '0') {
      this.initOptions(categorys)
    } else {
      // 二级列表
      return categorys
    }
  }
  loadData = async (selectedOptions) => {
    // 的到选择的option对象
    const targetOption = selectedOptions[selectedOptions.length - 1]
    // loading效果
    targetOption.loading = true

    // 根据选中的分类请求获取下一级分类
    const subCategorys = await this.getCategorys(targetOption.value)
    if (subCategorys && subCategorys.length > 0) {
      // 生成二级列表options
      const cOptions = subCategorys.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 某一项的下一级列表
      targetOption.children = cOptions
    } else {
      targetOption.isLeaf = true
    }
    targetOption.loading = false
    this.setState({
      options: [...this.state.options]
    })
  }
  componentDidMount() {
    this.getCategorys()
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
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
              onChange={this.onChange}
              changeOnSelect
            />
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
