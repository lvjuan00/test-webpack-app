import React from 'react'
import './file-type.scss'
import downloadImage from '@config/backend'
// import downloadImage from '@config/download'
// import backend from '@config/backend'
import {
  withRouter,
} from 'react-router-dom'

import downIconImg from '@static/images/down_icon.png'
import playerImg from '@static/images/player.png'
import fileTypeImg from '@views/resource-detail/images/file-type1.png'
// import pptIconImg from '@static/images/ppt_icon.png'
// import wordIcon from '@static/images/word_icon.png'
import videoNoBgImg from '@static/images/video_no_bg.png'
import videoBgImg from '@components/file-type/images/video_bg.png'
import pdfBgImg from '@components/file-type/images/pdf_bg.png'
import wordBgImg from '@components/file-type/images/word_bg.png'
import zipBgImg from '@components/file-type/images/zip_bg.png'
import flashPlay from '@config/flashPlay'
import switchGrayImg from '@components/file-type/images/swich_gray.png'

import Video from '@components/video'

class FileType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeType: [
        {
          sign: 0, type: '未知',
        },
        {
          sign: 1, type: '活动方案',
        },
        {
          sign: 2, type: '动画片',
        },
        {
          sign: 3, type: '实景视频',
        },
        {
          sign: 4, type: '课件',
        },
        {
          sign: 5, type: '活动纸',
        },
        {
          sign: 6, type: '资料图片',
        },
        {
          sign: 7, type: '主题玩教具视频',
        },
        {
          sign: 8, type: '主题玩教具操作说明',
        },
        {
          sign: 9, type: '教育信息',
        },
        {
          sign: 10, type: '环创',
        },
        {
          sign: 11, type: '智能区角教具视频',
        },
        {
          sign: 12, type: '智能区角操作说明',
        },
      ],
      fileData: null,
      videoFlag: false,
      videoSrc: null,
      videoImg: null,
    }
    this.ownerFile = this.ownerFile.bind(this)
    this.videoFlagFn = this.videoFlagFn.bind(this)
    this.divisionFn = this.divisionFn.bind(this)
    this.changeDowndata = this.changeDowndata.bind(this)
  }

  componentDidMount() {
    // do something here
    const arr = []
    let newObj = {}
    const { file } = this.props
    if (file) {
      if (file.owner) {
        this.ownerFile(file)
      } else {
        if (file.instruction && file.video) {
          Object.keys(file).map((item) => {
            file[item].special = item
            arr.push(file[item])
            return 3
          })
          arr.map((ite) => {
            if (arr.length > 1) {
              if (ite.special === 'instruction') {
                newObj = {
                  special_url: ite.url,
                  special_owner: ite.owner,
                  special_resource_id: ite.resource_id,
                  special_is_used: ite.is_used,
                  special_name: ite.name,
                  special_thumbnail: ite.thumbnail,
                }
              } else if (ite.special === 'video') {
                Object.assign(ite, newObj)
                this.ownerFile(ite)
              }
            } else if (arr.length > 0 && arr.length <= 1) {
              if (ite.special === 'instruction') {
                ite.video_no_bg = videoNoBgImg
                this.ownerFile(ite)
              } else if (ite.special === 'video') {
                this.ownerFile(ite)
              }
            }
            return 4
          })
        } else if (file.instruction && !file.video) {
          Object.keys(file).map((item) => {
            if (file[item]) {
              file[item].special = item
              arr.push(file[item])
            }
            return 3
          })
          arr.map((ite) => {
            if (arr.length >= 1) {
              if (ite.special === 'instruction') {
                newObj = {
                  special_url: ite.url,
                  special_owner: ite.owner,
                  special_resource_id: ite.resource_id,
                  special_is_used: ite.is_used,
                  // special_name: ite.name,
                }
                Object.assign(ite, newObj)
                ite.video_no_bg = videoNoBgImg
                this.ownerFile(ite)
              }
            }
            return 4
          })
        } else if (file.video && !file.instruction) {
          Object.keys(file).map((item) => {
            if (file[item]) {
              file[item].special = item
              arr.push(file[item])
            }
            arr.map((ite) => {
              if (arr.length >= 1) {
                this.ownerFile(ite)
              }
              return 5
            })
            return 3
          })
        }
      }
    }
  }

  ownerFile(file) {
    const { activeType } = this.state
    activeType.map((item) => {
      if ((item.sign === 1 || item.sign === 9) && (item.sign === file.owner || item.sign === file.special_owner)) {
        if (item.sign === file.special_owner) {
          file.special_downIcon = downIconImg
          // file.specicon_icon = wordIcon
        } else {
          file.downIcon = downIconImg
          // file.icon = wordIcon
        }
        if (file.thumbnail === '') {
          file.thumbnail = wordBgImg
        }
        // console.log('这是个 word')
      } else if ((item.sign === 8 || item.sign === 12) && (item.sign === file.owner || item.sign === file.special_owner)) {
        if (file.thumbnail === '') {
          file.thumbnail = pdfBgImg
        }
        // console.log('这是个pdf')
      } else if (item.sign === 10 && (item.sign === file.owner || item.sign === file.special_owner)) {
        if (item.sign === file.special_owner) {
          file.special_downIcon = downIconImg
        } else {
          file.downIcon = downIconImg
        }
        if (file.thumbnail === '') {
          file.thumbnail = zipBgImg
        }
        // console.log('这是个压缩文件')
      } else if ((item.sign === 5 || item.sign === 6) && (item.sign === file.owner || item.sign === file.special_owner)) {
        if (item.sign === file.special_owner) {
          file.special_downIcon = downIconImg
        } else {
          file.downIcon = downIconImg
        }
        if (file.thumbnail === '') {
          file.thumbnail = fileTypeImg
        }
        // console.log('这是 图片')
      } else if ((item.sign === 2 || item.sign === 3 || item.sign === 4 || item.sign === 7 || item.sign === 11) && (item.sign === file.owner || item.sign === file.special_owner)) {
        if (item.sign === file.special_owner) {
          file.special_playerIcon = playerImg
        } else {
          file.playerIcon = playerImg
        }
        if (file.thumbnail === '') {
          file.thumbnail = videoBgImg
        }
        // console.log('这是个 视频')
      }
      return 2
    })
    this.setState({
      fileData: file,
    })
  }

  videoFlagFn(flag) {
    // const { videoFlag } = this.state
    // console.log(videoFlag)
    this.setState({
      videoFlag: flag,
    })
  }

  divisionFn(data) {
    const {
      metamorphosis,
      metamorphosisIndex,
      metamorphosisFn,
    } = this.props
    if (data.special) {
      // console.log('教具')
      if ((data.owner === 5 || data.owner === 6 || data.special_owner === 5 || data.special_owner === 6)) {
        if (metamorphosis === 'metamorphosis') {
          metamorphosisFn(true, metamorphosisIndex)
        } else {
          window.open(data.special_url || data.url)
        }
        // console.log('图片用作展示')
      } else if ((data.owner === 8 || data.owner === 12 || data.special_owner === 8 || data.special_owner === 12)) {
        window.localStorage.setItem('pdf', data.special_url)
        window.open(process.env.NODE_PDF)
        // console.log('pdf用作展示')
      } else if ((data.owner === 1 || data.owner === 9 || data.special_owner === 1 || data.special_owner === 9)) {
        //  很特殊，属于微软提供的插件，使用需谨慎
        // window.open(`http://view.officeapps.live.com/op/view.aspx?src=${data.url || data.special_url}`, '_blank')
        window.open('http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=' + (data.url || data.special_url), '_blank')
      }
    } else {
      if ((data.owner === 5 || data.owner === 6) && !data.playerIcon) {
        if (metamorphosis === 'metamorphosis') {
          metamorphosisFn(true, metamorphosisIndex)
        } else {
          window.open(data.url)
        }
        // console.log('图片用作展示')
      } else if (data.owner === 8 || data.owner === 12) {
        window.localStorage.setItem('pdf', data.url)
        window.open(process.env.NODE_PDF)
        // console.log('pdf用作展示')
      } else if (data.owner === 1 || data.owner === 9) {
        //  很特殊，属于微软提供的插件，使用需谨慎
        // window.open(`http://view.officeapps.live.com/op/view.aspx?src=${data.url || data.special_url}`, '_blank')
        window.open('http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=' + (data.url || data.special_url), '_blank')
      }
    }
  }

  changeDowndata(data) {
    // http://course365.oss-cn-shanghai.aliyuncs.com/release%2Ftupian%2F201861%2Fe77a0fb71216cdb3c928bead920fbf6a.rar
    if (data.downIcon || data.special_downIcon) {
      if ((data.owner === 5 || data.owner === 6) && data.is_used !== 1) {
        return (
          <span>
            <img
              src={data.downIcon || data.special_downIcon}
              alt=""
              onClick={() => {
                downloadImage(data.url, data.name)
                // console.log('下载图片')
              }}
            />
          </span>
        )
      } else if ((data.owner === 1 || data.owner === 9 || data.owner === 10) && data.is_used !== 1) {
        // console.log('下载文件 压缩文件')
        return (
          <a href={data.url}>
            <img
              src={data.downIcon || data.special_downIcon}
              alt=""
            />
          </a>
        )
      }
    }
  }

  render() {
    // const { file } = this.props
    const {
      fileData,
      videoFlag,
      videoSrc,
      videoImg,
    } = this.state
    const {
      history,
      gradeName,
      grade,
      teacherName,
    } = this.props
    return (
      <React.Fragment>
        {
          fileData && (
            <div className="file-type">
              <div
                className="file-type-img"
                // style={{
                  // background: fileData.video_no_bg ? 'url(' + fileData.video_no_bg + ') no-repeat' : 'url(' + fileData.thumbnail || fileData.special_thumbnail + ') no-repeat',
                  // backgroundSize: 'cover',
                // }}
                onClick={() => {
                  if (fileData.special) {
                    // console.log('无需点击')
                  } else if (fileData.is_used !== 1) {
                    this.divisionFn(fileData)
                  } else if (fileData.is_used === 1) {
                    history.push({
                      pathname: '/resource-detail',
                      state: {
                        resource_id: fileData.resource_id || fileData.special_resource_id,
                        data: fileData,
                      },
                    })
                    // console.log('可跳转')
                  }
                }}
              >
                <img
                  className="file-type-img-bg"
                  src={fileData.video_no_bg ? fileData.video_no_bg : fileData.thumbnail || fileData.special_thumbnail}
                  alt=""
                />
                {
                  fileData.playerIcon && fileData.is_used !== 1 && (
                    <img
                      className="file-type-img-player"
                      src={fileData.playerIcon}
                      alt="player"
                      onClick={() => {
                        if (fileData.owner === 4) {
                          flashPlay(fileData.url)
                          // console.log('flash')
                        } else {
                          this.setState({
                            videoFlag: true,
                            videoSrc: fileData.url,
                            videoImg: fileData.thumbnail,
                          })
                        }
                      }}
                    />
                  )
                }
                {
                  fileData.icon && (
                    <img
                      className="file-type-img-sign"
                      src={fileData.icon}
                      alt="sign"
                    />
                  )
                }
                {
                  teacherName && teacherName && (
                    <div className="file-type-img-teacher">
                      <span className="file-type-img-teacher-name">{teacherName}</span>
                    </div>
                  )
                }
              </div>
              <div className="file-type-section">
                {
                  fileData.special ? (
                    <React.Fragment>
                      {
                        !fileData.special_name ? (
                          <p
                            className={
                              fileData.video_no_bg ? 'file-type-section-blue' : 'file-type-section-gray'
                            }
                          >
                            <span
                              onClick={() => {
                                this.divisionFn(fileData)
                              }}
                            >
                              {fileData.name}
                            </span>
                            {
                              this.changeDowndata(fileData)
                            }
                            {
                              fileData.is_used === 1 && (
                                <span className="file-type-section-show">
                                  <img src={switchGrayImg} alt="show" />
                                </span>
                              )
                            }
                          </p>
                        ) : (
                          <React.Fragment>
                            <p className="file-type-section-gray">
                              <span>{fileData.name}</span>
                              {
                                this.changeDowndata(fileData)
                              }
                            </p>
                            <p className="file-type-section-blue">
                              <span
                                onClick={() => {
                                  this.divisionFn(fileData)
                                }}
                              >
                                {fileData.special_name}
                              </span>
                              {
                                this.changeDowndata(fileData)
                              }
                            </p>
                          </React.Fragment>
                        )
                      }
                    </React.Fragment>
                  ) : (
                    <p className="file-type-section-gray">
                      <span>{fileData.name}</span>
                      {
                        this.changeDowndata(fileData)
                      }
                      {
                        fileData.is_used === 1 && (
                          <span className="file-type-section-show">
                            <img src={switchGrayImg} alt="show" />
                          </span>
                        )
                      }
                    </p>
                  )
                }
              </div>
                {
                  gradeName && grade && (
                    <div className="file-type-grade">
                      <span className={`grade-name-${grade}`}>{gradeName}</span>
                    </div>
                  )
                }
            </div>
          )
        }
        {
          videoFlag && (
            <Video
              videoFlagFn={this.videoFlagFn}
              videoSrc={videoSrc}
              videoImg={videoImg}
            />
          )
        }
      </React.Fragment>
    )
  }
}

export default withRouter(FileType)
