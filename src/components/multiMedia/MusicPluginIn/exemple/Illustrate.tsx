import React, {
  useState,
  useEffect,
  useCallback,
} from 'react'

import './style.less'
import { musicList } from './data/music'
import MusicPluginIn from 'components/MusicPluginIn'

function Illustrate() {
  const [count, setCount] = useState(0)
  const [music, setMusic] = useState(musicList[count])
  const [isPlay, setIsPlay] = useState(false)
  const onPlayerEvent = useCallback(() => {
    // 控制播放行为
    setIsPlay(!isPlay)
  }, [isPlay])

  const onNextEvent = useCallback(() => {
    // 下一首切歌行为
    if (count < musicList.length - 1) {
      setCount(count + 1)
      setIsPlay(true)
    }
  }, [count])

  const onPlayerEndedEvent = useCallback((flag) => {
    // 播放结束后行为
    if (flag) {
      if (count < musicList.length - 1) {
        onNextEvent()
      } else {
        setIsPlay(false)
        setCount(0)
      }
    }
  }, [isPlay, count])

  const onPrevEvent = useCallback(() => {
    // 上一首切歌行为
    if (count > 0) {
      setCount(count - 1)
      setIsPlay(true)
    }
  }, [count])

  useEffect(() => {
    // 更换音乐
    setMusic(musicList[count])
  }, [count])

  return (
    <div className="music">
      <div className="music-container">
        <div className="music-container-player">
          <MusicPluginIn src={music.source} isPlay={isPlay} ended={onPlayerEndedEvent} />
        </div>
        <div>
          <button onClick={onPrevEvent}>上一首</button>
          <button onClick={onPlayerEvent}>播放</button>
          <button onClick={onNextEvent}>下一首</button>
        </div>
      </div>
    </div>
  )
}

export default Illustrate
