const merge = require('webpack-merge')
const BaseConfig = require('./webpack.base')
const config={
  apiUrl: 'http://prod.com', // 正式环境
  token: 'prodDefault'
}

const prodConfig = {
  mode: 'production',
  
}
module.exports=merge(BaseConfig(config), prodConfig)