module.exports = {
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456'
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appId: '',
    appSecret: '',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  yushu: {
    detailUrl: 'http://bl.talelin.com/v1/book/id/%s',
    keywordUrl: 'http://bl.talelin.com/v1/book/search?q=%s&count=%s&start=%s&summary=%s',
    appkey: 'RdshydjBvcYZhMZC'
  },
  host: 'http://localhost:3000/'
}