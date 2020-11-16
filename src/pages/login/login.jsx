import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './login.less'
import logo from './images/logo.png'
/**
 * 登录的路由组件
 */
export default class Login extends Component {
  // 表单提交事件
  handleSubmit = (event) => {}
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
            onSubmit={this.handleSubmit}
          >
            <Form.Item>
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
            <Form.Item>
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
