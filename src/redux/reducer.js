/**
 * 用来根据老的state和指定的action生成并返回新的state的函数
 */
import storageUtils from '../utils/storageUtils'
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-type'
import { combineReducers } from 'redux'

const initHeadTitle = '首页'
// 用来管理头部标题的reducer
function headTitle (state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}
// 用来管理用户的reducer
const initUser = storageUtils.getUser()
function user (state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      console.log(action.user);
      return action.user
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      return { ...state, errorMsg }
    case RESET_USER:
      return {}
    default:
      return state
  }
}
// 向外默认暴露的是合并产生的总的reducer函数
// 管理的总的结构：
/**
{
  headTitle:'首页',
  user:{}
}
*/
export default combineReducers({
  headTitle,
  user
})