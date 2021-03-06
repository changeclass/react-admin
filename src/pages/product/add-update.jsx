import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddOrUpdateProduct } from '../../api'
import memoryUtils from '../../utils/memoryUtils'

const { Item } = Form
const { TextArea } = Input

// Product的添加和更新的子路由组件
export default class ProductAddUpdate extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    const product = memoryUtils.product
    // 创建用于保存ref表示的容器
    this.pw = React.createRef()
    this.edit = React.createRef()
    // 保存是否更新的表示
    this.isUpdate = !!product._id
    this.product = product || {}
  }
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
  initOptions = async (categorys) => {
    // 根据categorys数组生成options数组
    const options = categorys.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }))
    // 如果是一个二级分类商品的更新
    const { isUpdate, product } = this
    const { pCategoryId, categoryId } = product
    if (isUpdate && pCategoryId !== '0') {
      // 获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId)
      // 生成二级下拉列表的options
      const childOptions = subCategorys.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 找到当前商品对应的option对象
      const targetOption = options.find(
        (option) => option.value === pCategoryId
      )
      // 关联到对应的一级options
      targetOption.children = childOptions
    }

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
  componentWillUnmount() {
    memoryUtils.product = {}
  }
  // 表单提交事件
  handleSubmit = () => {
    // 表单对象
    const form = this.formRef.current
    form
      .validateFields()
      .then(async (result) => {
        // 1. 收集数据
        const { name, desc, price, categoryIds } = result
        let pCategoryId, categoryId
        if (categoryIds.length === 1) {
          pCategoryId = 0
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        // 获取图片列表
        let imgs = this.pw.current.getImgs()
        // 获取商品描述
        let detail = this.edit.current.getDetail()
        const product = {
          name,
          desc,
          price,
          imgs,
          detail,
          pCategoryId,
          categoryId
        }
        // 如果是更新 需要添加_id
        if (this.isUpdate) {
          product._id = this.product._id
        }
        // 添加或者更新
        const res = await reqAddOrUpdateProduct(product)
        if (res.status !== 0) return message.error('更新失败')
        message.success(`${this.isUpdate ? '更新' : '添加'}商品成功`)
        this.props.history.goBack()
        // 根据结果提示
        console.log(result)
      })
      .catch()
  }
  render() {
    const isupdate = this.isUpdate
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>
        <span>{isupdate ? '修改商品' : '添加商品'}</span>
      </span>
    )
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }
    const { product, isUpdate } = this
    const { pCategoryId, categoryId, imgs, detail } = product

    const categoryIds = []
    if (isUpdate) {
      // 商品是一级分类商品
      if (pCategoryId === '0') {
        categoryIds.push(pCategoryId)
      } else {
        // 商品是二级分类商品
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }
    return (
      <Card title={title}>
        <Form
          {...formItemLayout}
          ref={this.formRef}
          onFinish={this.handleSubmit}
        >
          <Item
            label='商品名称'
            rules={[{ required: true, message: '请输入商品名称' }]}
            name='name'
            initialValue={product.name}
          >
            <Input placeholder='商品名称' />
          </Item>
          <Item
            label='商品描述'
            name='desc'
            rules={[{ required: true, message: '请输入商品描述' }]}
            initialValue={product.desc}
          >
            <TextArea
              placeholder='商品描述'
              autoSize={{ minRows: 2, maxRows: 5 }}
            />
          </Item>
          <Item
            label='商品价格'
            name='price'
            rules={[
              { required: true, message: '请输入商品价格' },
              { validator: this.validatorPrice }
            ]}
            initialValue={product.price}
          >
            <Input type='number' placeholder='商品价格' addonAfter='元' />
          </Item>
          <Item
            label='商品分类'
            name='categoryIds'
            initialValue={categoryIds}
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
              onChange={this.onChange}
              changeOnSelect
            />
          </Item>
          <Item label='商品图片' name='imgs'>
            <PicturesWall ref={this.pw} imgs={imgs} />
          </Item>
          <Item
            label='商品详情'
            name='detail'
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
          >
            <RichTextEditor ref={this.edit} detail={detail} />
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
