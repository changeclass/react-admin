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
    // 此事件只有表单验证通过后才会触发
    console.log(this.formRef.current)
    // 调用 getFieldValue 方法获取Form.Item.name 的值 （即username和password）
    const { getFieldValue } = this.formRef.current
    const { username, password } = getFieldValue()
    console.log(username, password)
  }
  // 自定义验证-密码
  // AntD4中已经没有callback回调函数了，而是返回Promise对象
  validatePwd = (rule, value) => {
    // value 表示当前输入框传入的值
    console.log(rule, value)
    if (!value) {
      return Promise.reject('密码必须输入')
    } else if (value.length < 5) {
      return Promise.reject('密码长度不能小于4')
    } else if (value.length > 12) {
      return Promise.reject('密码长度不能大于12')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('密码必须是大写字母、小写字母或下划线组成')
    } else {
      return Promise.resolve()
    }
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
              // 声明式验证
              rules={[
                { required: true, whitespace: true, message: '请输入用户名' },
                { min: 4, message: '用户名最少4位' },
                { max: 12, message: '用户名最多12位' },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '用户名必须是大写字母、小写字母或下划线组成'
                }
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
              rules={[{ validator: this.validatePwd }]}
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
