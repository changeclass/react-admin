/**
 * 管理的路由组件
 */
import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    // 判断是否存在user
    if (!user || !user._id) {
      // 没有登录，自动跳转
      return <Redirect to='/login' />
    } else {
      return <div>Hello {user.username}</div>
    }
  }
}
