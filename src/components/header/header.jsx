import React, { Component } from 'react'
import LinkButton from '../link-button'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils.js'
import { reqWeather } from '../../api/index'
// 顶部组件
export default class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '', // 天气的图片
    weather: '' // 天气的文本
  }
  getTime = () => {
    setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('保定')
    this.setState({ dayPictureUrl, weather })
  }
  componentDidMount() {
    // 第一次render之后执行
    // 一般在此执行异步操作
    this.getTime()
    // 获取当前天气显示
    this.getWeather()
  }
  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const username = memoryUtils.user.username
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>首页</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt='weather' />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
