const util = require('util');
const axios = require('axios');
const { User } = require('@model');
const Auth = require('@middlewares/auth');
const { generateToken } = require('@core/util');

class WXManager {
  static async codeToToken(code) {
    // code appid appserect
    const { loginUrl, appId, appSecret } = global.config.wx;
    const url = util.format(loginUrl, appId, appSecret, code);
    console.log(url)
    const result = await axios.get(url);
    if (result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败')
    }
    const { errcode, errmsg } = result.data

    if (errcode && errcode !== 0) {
      throw new global.errs.AuthFailed(`openid获取失败:${errmsg}`)
    }

    const openid = result.data.openid;

    let user = await User.getUserByOpenid(openid);
    if (!user) {
      user = await User.registerByOpenid(openid);
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = WXManager;