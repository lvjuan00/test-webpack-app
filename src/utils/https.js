
//  从别的项目粘贴过来的
/*
  其实就是实在化一个axios,然后根据环境变量配置不同参数
*/
import axios from 'axios'
import history from '@config/history'
import { getCookie } from '@src/utils'

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nZG9uZ3lhbmciLCJ1c2VyX2lkIjoxLCJlbWFpbCI6Ijg3NzM1Nzk3OUBxcS5jb20iLCJleHAiOjE1NDgzMDQwNzd9.N_B1FgFglzdWoy-vrLtmuypNiSN55S09XqA_zq_hRy8'
axios.defaults.baseURL = process.env.NODE_HOST

axios.interceptors.request.use(
  config => {
    const token = getCookie('token') || window.localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      // config.headers.token = `JWT ${token}`
      config.headers.common.Authorization = `JWT ${token}`
    }
    // if (config.url.indexOf(host) === -1) {
    //   config.url = config.url // 拼接完整请求路径
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  if (error.response.status === 401 || error.response.status === 447) {
    if (error.response.status === 447) {
      alert('您使用的账号已在其他地方登录，请重新登录')
    }
    // else if (error.response.status === 444) {
    //   alert('用户不存在')
    // }
    history.push('/login')
    window.localStorage.removeItem('token')
  }

  return Promise.reject(error)
})

export default axios
