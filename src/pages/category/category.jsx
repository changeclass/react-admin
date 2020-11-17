import React, { Component } from 'react'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'

import { Card, Table, Button, message, Modal } from 'antd'

import LinkButton from '../../components/link-button'
import AddForm from './add-form'
import UpdateForm from './update-form'
import {
  reqAddCategory,
  reqUpdateCategory,
  reqCategorys
} from '../../api/index'
// 分类路由
export default class Category extends Component {
  constructor(props) {
    super(props)
    this.columns = this.initColumn()
  }
  state = {
    loading: false, // 是否正在获取数据中
    categorys: [], // 一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: '0', // 当前需要显示的分类列表的父分类ID
    parentName: '', // 当前需要显示的分类列表的父分类名称
    showStatus: 0 // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  }
  // 定义列名
  initColumn() {
    return [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: '_id'
      },
      {
        title: '操作',
        dataIndex: 'age',
        key: '_id',
        width: 300,
        // 返回需要显示的样式
        render: (text, category) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>
              修改
            </LinkButton>
            {this.state.parentId === '0' ? (
              <LinkButton
                onClick={() => {
                  this.showSubCategorys(category)
                }}
              >
                查看二级分类
              </LinkButton>
            ) : null}
          </span>
        )
      }
    ]
  }
  // 发送异步请求获取数据
  getCategories = async () => {
    this.setState({ loading: true })
    const { parentId } = this.state
    const result = await reqCategorys(parentId)
    this.setState({ loading: false })
    if (result.status !== 0) return message.error('获取列表失败')
    const categorys = result.data
    if (parentId === '0') {
      this.setState({ categorys })
    } else {
      this.setState({ subCategorys: categorys })
    }
  }
  // 获取一级分类列表
  showCategorys = () => {
    // 先更新状态在调用
    this.setState(
      {
        parentId: '0',
        subCategorys: [],
        parentName: ''
      },
      // setState为异步,因此需要使用回调函数
      () => {
        this.getCategories()
      }
    )
  }
  // 获取指定分类下的二级分类
  showSubCategorys = (category) => {
    // 先更新状态在调用
    this.setState(
      {
        parentId: category._id,
        parentName: category.name
      },
      // setState为异步,因此需要使用回调函数
      () => {
        this.getCategories()
      }
    )
  }
  // 取消添加分类或更新分类的对话框
  handleCancel = () => {
    // 重置表单字段
    this.form.resetFields()
    console.log(this.form)
    this.setState({
      showStatus: 0
    })
  }
  // 显示添加的对话框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  // 添加分类
  AddCategory = () => {
    this.handleCancel()
  }
  /** 更新相关 */
  // 显示更新的对话框
  showUpdate = (category) => {
    this.category = category
    this.setState({
      showStatus: 2
    })
  }
  // 更新分类
  updateCategory = async () => {
    // 发送请求
    const categoryId = this.category._id
    const categoryName = this.form.getFieldValue('name')
    // 重置表单字段
    this.form.resetFields()
    const { status } = await reqUpdateCategory({ categoryId, categoryName })
    if (status !== 0) return message.error('错误了！')

    message.success('修改成功！')
    // 隐藏对话框
    this.handleCancel()
    // 重新获取列表
    this.getCategories()
  }
  componentDidMount() {
    // 获取一级分类列表
    this.getCategories()
  }
  render() {
    const {
      categorys,
      loading,
      parentId,
      parentName,
      subCategorys,
      showStatus
    } = this.state
    // card的左侧标题
    const title =
      parentId === '0' ? (
        '一级分类列表'
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <ArrowRightOutlined style={{ marginRight: 5 }} />
          <span>{parentName}</span>
        </span>
      )
    // card的右侧按钮
    const extra = (
      <Button icon={<PlusOutlined />} type='primary' onClick={this.showAdd}>
        添加分类
      </Button>
    )
    // 读取指定分类
    const category = this.category || {}
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered={false}
            rowKey='_id'
            loading={loading}
            dataSource={parentId === '0' ? categorys : subCategorys}
            columns={this.columns}
            pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          ></Table>
        </Card>
        <Modal
          title='添加分类'
          visible={showStatus === 1}
          onOk={this.AddCategory}
          onCancel={this.handleCancel}
        >
          <AddForm />
        </Modal>
        <Modal
          title='更新分类'
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {
              this.form = form
            }}
          />
        </Modal>
      </div>
    )
  }
}
