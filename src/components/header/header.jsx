import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LinkButton from '../link-button'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils.js'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import './index.less'
// 顶部组件
class Header extends Component {
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
  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach((item) => {
      if (item.key === path) {
        // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) === 0
        )
        // 如果有值才说明有匹配的
        if (cItem) {
          // 取出它的title
          title = cItem.title
        }
      }
    })
    return title
  }
  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const username = memoryUtils.user.username
    const title = this.getTitle()
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
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
export default withRouter(Header)
