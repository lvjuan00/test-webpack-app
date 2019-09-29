import { LOGIN_IN } from './constants'
import request, { User, getRequest, postRequest }  from '@utils/request'
// import https from '../../../utils/https'
const getLogin = (data) =>({
  type: LOGIN_IN,
  data
})

// 不需要异步请求，写法
// export const getLoginIn = () => {
//   return (dispatch) => {
//     User.token = 'token123'
//     return dispatch(getLogin('token123'))
//   }
// }

// 需要发送请求fetch
export const getLoginIn = () => { //可以接收params
  return (dispatch) => {
    console.log('User', User)
    return getRequest('/APISIGN/login', {name: 'abc'})
      .then((res)=> {
        console.log(res) // 返回的数据
        User.token = 'token123'
        return dispatch(getLogin('token123'))
      })
      .catch((err) => {
        User.token = 'token123'
      })
  }
}

// 另一种写法 axios  伪代码 从别的项目粘过来，主要看思路
// export const getWeekMonthList = () => {
//   return (dispatch) => {
//     return https.get('/tuoyu/api/v1/common/data')
//       .then((res) => {
//         return dispatch(weekMonthList(res.data))
//       })
//   }
// }