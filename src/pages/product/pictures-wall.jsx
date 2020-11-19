import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqDeleteImg } from '../../api'
import propTypes from 'prop-types'

import { BASE_IMG_URL } from '../../utils/constants.js'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * 用于图片上传的组件
 */

export default class PicturesWall extends React.Component {
  constructor(props) {
    super(props)
    const { imgs } = this.props
    let fileList = []
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: 'done',
        url: BASE_IMG_URL + img
      }))
    }
    this.state = {
      previewVisible: false, // 是否显示大图预览
      previewImage: '', // 图片地址
      previewTitle: '',
      fileList
    }
  }

  static propTypes = {
    imgs: propTypes.array
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    })
  }
  // file：当前操作的图片文件
  // fileList：所有已上传的文件对象
  handleChange = async ({ file, fileList }) => {
    // 一旦上传成功，将当前上传的file的信息修正
    if (file.status === 'done') {
      const result = file.response
      if (result.status === 0) {
        message.success('成功了！')
        const { name, url } = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('失败了！')
      }
    } else if (file.status === 'removed') {
      const result = await reqDeleteImg(file.name)
      if (result.status !== 0) return message.error('删除失败！')
      message.info('删除成功！')
    }
    this.setState({ fileList })
  }
  getImgs = () => {
    return this.state.fileList.map((file) => file.name)
  }
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state
    return (
      <>
        <Upload
          action='/manage/img/upload'
          listType='picture-card' /**卡片样式 */
          accept='image/*'
          name='image' /**上传图片的字段 */
          fileList={fileList} /**已上传图片的列表 */
          onPreview={this.handlePreview} /**显示图片大图 */
          onChange={this.handleChange}
        >
          <div style={{ marginTop: 8 }}>
            <PlusOutlined />
          </div>
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
          width='100%'
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}
