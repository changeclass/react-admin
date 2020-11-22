/**
 * 包含n个action creator函数的模块
 * 同步：对象{}
 * 异步：thunk
 */
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-type'
import { reqLogin } from '../api'
import storageUtils from '../utils/storageUtils'
//  设置头部标题的同步action
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })

// 接收用户的同步action
export const recevieUser = (user) => ({ type: RECEIVE_USER, user })

// 显示错误信息的同步action
export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg })

// 登录的异步action
export const login = (username, password) => {
  return async dispath => {
    // 1. 执行异步ajax请求
    const result = await reqLogin(username, password)
    if (result.status === 0) {
      // 2.1 成功=>分发 成功的同步action
      const user = result.data
      // 保存到local中
      storageUtils.saveUser(user)
      // 分发接收用户的同步action
      dispath(recevieUser(user))
    } else {
      // 2.2 失败=>分发 失败的同步action
      const msg = result.msg
      // message.error(msg)
      dispath(showErrorMsg(msg))
    }
  }
}

// 退出登录同步
export const logout = () => {
  // 删除local中的user
  storageUtils.removeUser()
  return { type: RESET_USER }
}