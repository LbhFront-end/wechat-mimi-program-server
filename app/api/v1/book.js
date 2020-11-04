const Router = require('koa-router');
const { HotBook, Book, Comment, Favor } = require('@model')
const { success } = require('@lib/helper');
const { PositiveIntegerValidator, SearchValidator, AddShortCommentValidator } = require('@validator');
const Auth = require('@middlewares/auth');


const router = new Router({
  prefix: '/v1/book'
})

router.get('/hot_list', async (ctx) => {
  ctx.body = await HotBook.getAll();
})

router.get('/:id/detail', async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx);
  ctx.body = await Book.detail(v.get('path.id'))
})

router.get('/search', async (ctx) => {
  const v = await new SearchValidator().validate(ctx);
  const { q, start, count, summary } = v.get('query');
  ctx.body = await Book.searchFromYuShu(q, start, count, summary);
})

router.get('/favor/count', new Auth().m, async (ctx) => {
  ctx.body = {
    count: await Book.getMyFavorBookCount(ctx.auth.uid)
  }
})

router.get('/:book_id/favor', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  })
  ctx.body = await Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'));

})

router.post('/add/short_comment', new Auth().m, async (ctx) => {
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: 'book_id'
  })
  const { book_id, content } = v.get('body');
  Comment.addComment(book_id, content);
  success();

})
router.get('/:book_id/short_comment', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  })
  const { book_id } = v.get('path');
  const comments = await Comment.getComments(book_id);
  ctx.body = {
    comments,
    book_id
  }
})

router.get('/hot_keyword', async (ctx) => {
  ctx.body = {
    hot: [
      'Python',
      '哈利·波特',
      '村上春树',
      '东野圭吾',
      '白夜行',
      '韩寒',
      '金庸',
      '王小波'
    ]
  }
})

module.exports = router