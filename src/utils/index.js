// 解析 url ？ 后的参数
export function parseQueryString(url = window.location.href){
  const str = url.split('?')[1]
  if (!str) return {}
  const items = str.split('&')
  const obj = {}
  items.forEach(e => {
    const arr = e.split('=')
    obj[arr[0]] = arr[1]
  })
  return obj
}
export function parseToSearch(url, params) {
  if (params) {
    const paramsArray = []
    // 拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return url
}

// 设置cookie
export function setCookie(name, value) {
  // const exdate = new Date();
  // exdate.setDate(exdate.getDate() + expiredays);
  // document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/;domain=" + topDomain)
  document.cookie = name + '=' + escape(value) + ';path=/;domain=' + topDomain
}

// 获取cookie
export function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

// 删除cookie
export function delCookie(name) {
  const exp = new Date(new Date() - 1);
  document.cookie = name + '=' + 0 + ';expires=' + exp.toGMTString() + ';path=/;domain=' + topDomain;
}

// 是否是手机号码
export function isPhoneNumber(number) {
  const str = number.toString()
  console.log(str)
  const reg = /^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\d{8}$/
  return reg.test(str)
}

// 判断文件扩展名
export function isNameSuffix(path, types){
  const regStr = '.(' + types.join(')|(') + ')$'
  const reg = new RegExp(regStr, 'i')
  return reg.test(path)
}

// 是否是图片
export function isImage(path){
  const types = ["gif", "jpeg", "jpg", "bmp", "png"]
  return isNameSuffix(path, types)
}

// 是否是视频
export function isVideo(path){
  const types = ['avi', 'mp4','wmv', 'rmvb', 'aif', '3gp']
  return isNameSuffix(path, types)
}

function back_common() {
  history.pushState(null, '', document.URL);
}

//禁用浏览器返回
export function fobidden_back() {
  //防止页面后退
  history.pushState(null, '', document.URL);
  window.addEventListener('popstate',back_common)
}
//启用浏览器返回
export function enable_back() {
  history.go(-1);
  window.removeEventListener('popstate',back_common)
}



