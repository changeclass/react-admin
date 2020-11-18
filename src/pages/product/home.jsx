import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option
// product的默认子路由组件
export default class ProductHome extends Component {
  state = {
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: '', // 搜索的关键字
    searchType: 'productName' // 根据哪个字段搜索
  }
  getProducts = async (pageNum) => {
    this.setState({ loading: true })
    const { searchName, searchType } = this.state
    let result
    if (searchName) {
      // 搜索
      result = await reqProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType
      })
    } else {
      // 一般分页
      result = await reqProducts(pageNum, 3)
    }
    this.setState({ loading: false })
    if (result.status !== 0) return message.error('错误')
    const { total, list } = result.data
    this.setState({
      total,
      products: list
    })
  }
  componentDidMount() {
    this.getProducts(1)
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
