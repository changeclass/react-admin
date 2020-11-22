/**
 * 包含n个action creator函数的模块
 * 同步：对象{}
 * 异步：thunk
 */
import { SET_HEAD_TITLE } from './action-type'
//  设置头部标题的同步action
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })