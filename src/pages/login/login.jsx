import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './login.less'
import logo from './images/logo.png'
/**
 * 登录的路由组件
 */

export default class Login extends Component {
  // 创建表单实例
  formRef = React.createRef()
  // 表单提交事件
  handleSubmit = () => {
    console.log(this.formRef.current)
    // 调用 getFieldValue 方法获取Form.Item.name 的值 （即username和password）
    const { getFieldValue } = this.formRef.current
    const { username, password } = getFieldValue()
    console.log(username, password)
  }

  render() {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} />
          <h1>React项目：谷粒商城</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <Form
            name='normal_login'
            className='login-form'
            // 为表单添加引用
            ref={this.formRef}
            // 为表单添加校检完成的事件
            onFinish={this.handleSubmit}
          >
            <Form.Item
              name='username'
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input
                prefix={
                  <UserOutlined
                    className='site-form-item-icon'
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />
                }
                placeholder='Username'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input
                prefix={
                  <LockOutlined
                    className='site-form-item-icon'
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />
                }
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
