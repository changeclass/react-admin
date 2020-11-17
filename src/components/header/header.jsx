import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LinkButton from '../link-button'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import './index.less'
import { message, Modal } from 'antd'
// 顶部组件
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '', // 天气的图片
    weather: '' // 天气的文本
  }

  getTime = () => {
    this.interValID = setInterval(() => {
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
  // 当前组件卸载之前调用
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.interValID)
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
  // 退出
  logout = () => {
    Modal.confirm({
      title: 'Confirm',
      // icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 删除localStore数据和内存中的数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        // 跳转到Login
        this.props.history.replace('/login')
      },
      onCancel() {
        message.info('没有退出！')
      }
    })
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
