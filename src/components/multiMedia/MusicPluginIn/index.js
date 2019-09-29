import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react'
import './style.less'

/*
* props 属性值
*
* props src | <string> 音乐
* props isPlay | <boolean> 是否播放
* props ended | <fun> 控制播放结束之后行为
*
* */

function MusicPluginIn(props) {
  // 进度条
  const musicPluginInBar = useRef()
  // 进度条显示进度圆点
  const musicPluginInProgressBarBtn = useRef()
  // 音乐播放器 audio
  const musicPluginInController = useRef()

  // 播放总时长
  const [allTime, setAllTime] = useState(0)
  // 播放时间与长度比例
  const [speed, setSpeed] = useState(0)
  // 播放结束时间
  const [lastTime, setLastTime] = useState('00:00')
  // 播放起始时间
  const [beginTime, setBeginTime] = useState('00:00')
  // 播放当前时间
  const [currentTime, setCurrentTime] = useState(0)
  // 进度条宽度
  const [width, setWidth] = useState(0)
  // 进度条范围按下时 left 值
  const [left, setLeft] = useState(0)
  // 播放时显示进度条长度
  const [progressLen, setProgressLen] = useState(0)
  // 指定播放开始的时间

  // 监听播放结束事件
  const onEndedEvent = useCallback(() => {
    console.log('播放结束')
    props.ended(true)
  })

  // 计算起始时间 + 结束时间公用事件
  const onBeginEndEvent = useCallback((flag) => {
    let minutes = 0
    let seconds = 0
    if (flag) {
      // 起始时间
      minutes = currentTime > 60 ? parseInt(currentTime / 60) : '0'
      seconds = currentTime < 60 ? parseInt(currentTime) : parseInt(currentTime - minutes * 60)
    } else {
      // 结束时间
      minutes = parseInt(allTime / 60)
      seconds = parseInt(allTime - minutes * 60)
    }

    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
  }, [currentTime, allTime])

  // 控制进度条、进度条圆点公用事件
  const onProgressBarEvent = useCallback(() => {
    // 获取手指数量：e.targetTouches（此次不使用）
    const event = window.event
    const initX = musicPluginInBar.current
    if (left >= 0 && left <= width) {
      const left = event.changedTouches[0].clientX - initX.offsetLeft
      musicPluginInProgressBarBtn.current.style.width = left + 'px'
      musicPluginInController.current.currentTime = left / speed
      setLeft(left)
    }
  }, [left, speed, currentTime])

  // 进度条范围按下
  const onMouseStartEvent = useCallback(() => {
    console.log('progress down')
    onProgressBarEvent()
  }, [left, speed, currentTime])

  // 进度条范围抬起
  const onMouseEndEvent = useCallback(() => {
    console.log('progress up')
    onProgressBarEvent()
  }, [left, speed, currentTime])

  // 按下进度圆点并移动
  const onMouseMoveEvent = useCallback((e) => {
    console.log('button move')
    const event = window.event || e
    const endX = musicPluginInBar.current
    const left = event.touches[0].clientX - endX.offsetLeft
    if (left >= 0 && left <= width) {
      musicPluginInProgressBarBtn.current.style.width = left + 'px'
      const minutes = left / speed > 60 ? parseInt(left / speed / 60) : '0'
      const seconds = left / speed < 60 ? parseInt(left / speed) : parseInt(left / speed - minutes * 60)
      setBeginTime((minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds))
      setProgressLen(speed * currentTime)
      setLeft(left)
    }
  }, [left, beginTime, speed, progressLen, width])

  // 设置播放时进度条显示长度 + 音乐播放位置
  useEffect(() => {
    setProgressLen(speed * currentTime)
  }, [progressLen, speed, currentTime])

  // 监听播放中
  const onSyncTime = useCallback(() => {
    if (currentTime >= allTime) {
      props.ended(true)
    }
    setCurrentTime(musicPluginInController.current.currentTime)
  }, [currentTime, allTime])

  // 播放中
  useEffect(() => {
    if (props.isPlay) {
      musicPluginInController.current.play()
    } else {
      musicPluginInController.current.pause()
    }
  })

  useEffect(() => {
    // 监听计算总时长
    musicPluginInController.current.addEventListener('canplay', function() {
      setAllTime(musicPluginInController.current.duration)
      setSpeed(width / musicPluginInController.current.duration)
    })
  }, [allTime, width])

  useEffect(() => {
    // 设置起始时间
    setBeginTime(onBeginEndEvent(true))
  }, [beginTime, currentTime, allTime])

  useEffect(() => {
    // 设置结束时间
    setLastTime(onBeginEndEvent(false))
  }, [lastTime, currentTime, allTime])

  useEffect(() => {
    // 获取进度条宽度 + 设置音乐时长比例
    setWidth(musicPluginInBar.current.offsetWidth)
    setSpeed(musicPluginInBar.current.offsetWidth / allTime)
  }, [width, allTime])

  useEffect(() => {
    // 进度条显示进度圆点动起来
    if (progressLen <= width) {
      musicPluginInProgressBarBtn.current.style.width = `${progressLen}px`
    }
  }, [width, allTime, currentTime, progressLen])

  return (
    <div className="music-plugin-in-progress">
      <span className="music-plugin-in-progress-time music-plugin-in-progress-time-left">{beginTime}</span>
      <div
        className="music-plugin-in-progress-bar"
        ref={musicPluginInBar}
      >
        <div
          className="music-plugin-in-progress-bar-inner"
          onTouchStart={onMouseStartEvent}
          // onTouchEnd={onMouseEndEvent}
        >
          <audio
            ref={musicPluginInController}
            src={props.src}
            onEnded={onEndedEvent}
            onTimeUpdate={onSyncTime}
          />
        </div>
        <div
          className="music-plugin-in-progress-bar-button"
          ref={musicPluginInProgressBarBtn}
          onTouchStart={onMouseStartEvent}
        >
          <div
            className="music-plugin-in-progress-bar-button-icon"
            onTouchMove={onMouseMoveEvent}
            onTouchEnd={onMouseEndEvent}
          />
        </div>
      </div>
      <span className="music-plugin-in-progress-time music-plugin-in-progress-time-right">{lastTime}</span>
    </div>
  )
}

export default MusicPluginIn
