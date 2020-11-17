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
    categories: [],
    columns: [],
    loading: false
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
        render: () => (
          <span>
            <LinkButton>修改</LinkButton>
            <LinkButton>引入</LinkButton>
          </span>
        )
      }
    ]
  }
  // 发送异步请求获取数据
  getCategories = async () => {
    this.setState({ loading: true })
    const result = await reqCategorys('0')
    this.setState({ loading: false })
    if (result.status !== 0) message.error('获取列表失败')
    const categories = result.data
    this.setState({ categories })
  }
  componentDidMount() {
    // this.columns = this.initColumn()
    this.getCategories()
  }
  render() {
    const { categories, loading } = this.state
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
            dataSource={categories}
            columns={this.columns}
            pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          ></Table>
        </Card>
      </div>
    )
  }
}
