const axios = require('axios');
const util = require('util');
const { Sequelize, Model } = require('sequelize');
const sequelize = require('../../core/db');
const Favor = require('./favor');

class Book extends Model {
  constructor() {
    super();
  }

  static async detail(id) {
    const url = util.format(global.config.yushu.detailUrl, id);
    // const detail = await axios.get(url);
    return await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        appkey: global.config.yushu.appkey
      }
    }).then(res => {
      if (res) {
        return res.data
      }
    }).catch(err => {
      if (err) {
        return {
          message: `远程详情接口报错：${err.message}`
        };
      }
    })

  }

  static async searchFromYuShu(q, start, count, summary = 1) {
    const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), count, start, summary)
    return await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        appkey: global.config.yushu.appkey
      }
    }).then(res => {
      if (res) {
        return res.data
      }
    }).catch(err => {
      if (err) {
        return {
          err,
          message: `远程搜索接口报错：${err.message}`
        };
      }
    })
  }

  static async getMyFavorBookCount(uid) {
    const count = await Favor.count({
      where: {
        type: 400,
        uid
      }
    })
    return count;
  }
}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'book'
})

module.exports = Book;