/**
 * 入口文件
 */
import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
// import memoryUtils from './utils/memoryUtils'
// import storageUtils from './utils/storageUtils'
import App from './App';
import store from './redux/store'
// 读取Local中读取，保存到内存中
// const user = storageUtils.getUser()
// memoryUtils.user = user
ReactDOM.render(
  (<Provider store={store}><App /></Provider>),
  document.getElementById('root')
);
