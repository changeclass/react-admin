import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons'

import { Card, Table, Button, message } from 'antd'

import LinkButton from '../../components/link-button'

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
            <LinkButton>修改</LinkButton>
            <LinkButton
              onClick={() => {
                this.showSubCategorys(category)
              }}
            >
              查看二级分类
            </LinkButton>
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
  // 获取指定分类下的二级分类
  showSubCategorys = async (category) => {
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
      subCategorys
    } = this.state
    // card的左侧标题
    const title = '一级分类标题'
    // card的右侧按钮
    const extra = (
      <Button icon={<PlusOutlined />} type='primary'>
        Search
      </Button>
    )

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
      </div>
    )
  }
}
