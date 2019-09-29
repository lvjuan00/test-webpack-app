const  merge= require('webpack-merge')
const BaseConfig = require('./webpack.base')
const config={
  // mode:'development',
  apiUrl: 'http://test/server.hugmum365.com', // 测试环境
  token: 'devDefault'
}
const devConfig = {
  mode: 'development', // 写到这可以随时改测试或线上包是否要压缩
}

module.exports=merge(BaseConfig(config), devConfig)