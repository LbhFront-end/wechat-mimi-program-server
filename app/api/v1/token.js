const Router = require('koa-router');
const { LoginType } = require('@lib/enum');
const { TokenValidator, NotEmptyValidator } = require('@validator');
const { generateToken } = require('@core/util');
const Auth = require('@middlewares/auth');
const { User } = require('@model');
const WXManager = require('@services/wx');

const router = new Router({
  prefix: '/v1/token'
});

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx);
  const account = v.get('body.account')
  const type = v.get('body.type');
  const secret = v.get('body.secret');

  let token;
  switch (type) {
    case LoginType.ADMIN_EMAIL:
      break;
    case LoginType.USER_EMAIL:
      token = await emailLogin(account, secret);
      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(account)
      break;
    case LoginType.USER_MOBILE:
      break;
    default:
      throw new global.errs.ParameterException('没有相应的处理函数');
  }

  ctx.body = {
    token
  }
})

router.post('/verify', async (ctx) => {
  const v = await new NotEmptyValidator().validate(ctx);
  const is_valid = Auth.verifyToken(v.get('body.token'));
  ctx.body = {
    is_valid
  }

})

async function emailLogin(account, serect) {
  const user = await User.verifyEmailPassword(account, serect)
  return generateToken(user.id, Auth.USER);
}

module.exports = router;