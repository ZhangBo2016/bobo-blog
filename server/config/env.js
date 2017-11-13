/**
* @file 项目配置信息
*/

module.exports = {
  // 开发环境配置
  development: {
    mongo: {
      uri: 'mongodb://localhost:27017/bobo-house-dev'
    },
    port: '8090',
    AUTH: {
      default: {
        password: ''
      },
      jwtTokenSecret: 'bobo'
    }
  },

  // 生产环境配置
  production: {
    mongo: {
      uri: 'mongodb://localhost:27017/bobo-house-dev'
    },
    port: '8090'
  }
}
