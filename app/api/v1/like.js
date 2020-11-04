const Router = require('koa-router');
const Auth = require('@middlewares/auth');
const { success } = require('@lib/helper');
const { Favor } = require('@model');
const { LikeValidator } = require('@validator');

const router = new Router({
  prefix: '/v1/like'
});

router.post('/', new Auth().m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  });
  const { art_id, type } = v.get('body');
  await Favor.like(art_id, type, ctx.auth.uid);
  success();
})

router.post('/cancel', new Auth().m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  });
  const { art_id, type } = v.get('body');
  await Favor.dislike(art_id, type, ctx.auth.uid);
  success();
})

module.exports = router;