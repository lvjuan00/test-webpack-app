import { parseQueryString, parseToSearch } from './index'

// token 设成全局变量
export let User = {
  token: DEV_TOKEN ? DEV_TOKEN : ''
}

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  // if (response.status === 401) { // 暂时这么写
  //   window.location.hash = '#login'
  // }
  const error = new Error(response.statusText)
  error.response = response
  return error.response.json().then(data => {
    error.data = data
    throw error
  }, err => {
    error.data = { error: '请求失败,请检查网络' }
    throw error
  })
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  // 处理一下(原因：打包不走代理)
  if (IS_BUILD) {
    // url = API_URL + url.replace('/APISIGN', '')
    url = API_URL + url.replace(PROXY_PATH, '')
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}
export function getRequest(url, params, options) {
  const defaultOptions = {
    method: 'get',
    headers: {
      'Authorization': `JWT ${User.token}`,
      // 'x-techu-user': user.id,
    },
  }
  const newOptions = { ...defaultOptions, ...options }
  if (params) {
    // let paramsArray = []
    // //拼接参数
    // Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    // if (url.search(/\?/) === -1) {
    //   url += '?' + paramsArray.join('&')
    // } else {
    //   url += '&' + paramsArray.join('&')
    // }
    url = parseToSearch(url,params)
  }
  return request(url, newOptions)
}
export function postRequest(url, params, options) {
  const defaultOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `JWT ${User.token}`,
      // 'x-techu-user': user.id,
    },
  }
  const newOptions = { ...defaultOptions, ...options }
  if (params) {
    newOptions.body = JSON.stringify(params)
  }
  return request(url, newOptions)
}
