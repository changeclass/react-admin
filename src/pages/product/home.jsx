import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option
// product的默认子路由组件
export default class ProductHome extends Component {
  // 初始化列
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price // 当前指定了对应的属性, 传入的是对应的属性值
      },
      {
        width: 100,
        title: '状态',
        // dataIndex: 'status',
        render: (product) => {
          const { status, _id } = product
          const newStatus = status === 1 ? 2 : 1
          return (
            <span>
              <Button
                type='primary'
                onClick={() => this.updateStatus(_id, newStatus)}
              >
                {status === 1 ? '下架' : '上架'}
              </Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton
                onClick={() =>
                  this.props.history.push('/product/detail', { product })
                }
              >
                详情
              </LinkButton>
              <LinkButton
                onClick={() =>
                  this.props.history.push('/product/addupdate', product)
                }
              >
                修改
              </LinkButton>
            </span>
          )
        }
      }
    ]
  }
  state = {
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: '', // 搜索的关键字
    searchType: 'productName' // 根据哪个字段搜索
  }
  // 获得商品列表
  getProducts = async (pageNum) => {
    // 记录当前页码数，方便表格在任意页刷新
    this.pageNum = pageNum
    this.setState({ loading: true })
    const { searchName, searchType } = this.state
    let result
    if (searchName) {
      // 搜索
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType
      })
    } else {
      // 一般分页
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
    this.setState({ loading: false })
    if (result.status !== 0) return message.error('错误')
    const { total, list } = result.data
    this.setState({
      total,
      products: list
    })
  }
  // 更新状态
  updateStatus = async (productId, status) => {
    this.setState({ loading: true })
    const result = await reqUpdateStatus(productId, status)
    this.setState({ loading: false })
    if (result.status !== 0) return message.error('错误')
    message.success('成功了！')
    this.getProducts(this.pageNum)
  }
  componentDidMount() {
    this.getProducts(1)
    this.initColumns()
  }
  render() {
    // 取出状态数据
    const { products, total, loading, searchType, searchName } = this.state

    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 150, margin: '0 15px' }}
          value={searchName}
          onChange={(event) =>
            this.setState({ searchName: event.target.value })
          }
        />
        <Button type='primary' onClick={() => this.getProducts(1)}>
          搜索
        </Button>
      </span>
    )

    const extra = (
      <Button
        type='primary'
        onClick={() => this.props.history.push('/product/addupdate')}
      >
        <PlusOutlined />
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}
