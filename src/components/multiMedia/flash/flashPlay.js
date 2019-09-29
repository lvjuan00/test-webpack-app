export default function (url) {
  // console.log(url)
  // 测试数据
  // const url = 'http://course365.oss-cn-shanghai.aliyuncs.com/release/flash/September/3age/int_152%20%E4%B8%8D%E5%90%8C%E5%9C%BA%E6%89%80%E7%9A%84%E7%A7%A9%E5%BA%8F/player.html'
  if (!url) {
    return
  }
  const { screen } = window
  const { width } = screen
  const height = screen.height - 100
  const newUrl = `${url}?w=${width - 15}&h=${height - 20}`
  window.open(newUrl, 'flash', `width=${width}, height=${height}, scrollbars=yes`)
}
