import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons'

import { Card, Table, Button } from 'antd'

import LinkButton from '../../components/link-button'
// 分类路由
export default class Category extends Component {
  render() {
    // card的左侧标题
    const title = '一级分类标题'
    // card的右侧按钮
    const extra = (
      <Button icon={<PlusOutlined />} type='primary'>
        Search
      </Button>
    )
    const dataSource = [
      {
        parentId: '0',
        _id: '12334',
        name: '家用电器',
        __v: 0
      },
      {
        parentId: '0',
        _id: '123341',
        name: '电脑',
        __v: 0
      },
      {
        parentId: '0',
        _id: '1233411',
        name: '阿松大',
        __v: 0
      },
      {
        parentId: '0',
        _id: '123342',
        name: '烦烦烦',
        __v: 0
      }
    ]

    const columns = [
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
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered={false}
            rowKey='_id'
            dataSource={dataSource}
            columns={columns}
          ></Table>
        </Card>
      </div>
    )
  }
}
