/**
 * Created by Kevin on 7/16/17.
 */

const KoaRouter = require('koa-router')
const LeftPad = require("left-pad")
const UserDBAction = require('../database/UserDBAction')
const PrizeDBAction = require('../database/PrizeDBAction')

const apiRouter = KoaRouter({
  prefix: '/api'
})
const userDBAction = new UserDBAction();
const prizeDBAction = new PrizeDBAction()

apiRouter.get('/login', async (ctx, next) => {
  let username = ctx.query.username;
  let password = ctx.query.password;
  let userInfo = await userDBAction.getAdminUserByUserName(username, password);
  if (userInfo && userInfo.password === password) {
    if (userInfo.status === 0) {
      ctx.body = {code: 1, msg: `用户[${userInfo.user_name}]已经被禁用`};
      return;
    }
    let cookieOpts = {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15天
      httpOnly: true
    }
    ctx.cookies.set('user_name', encodeURI(`${userInfo.user_name}`), cookieOpts);
    ctx.cookies.set('id', userInfo.id, cookieOpts);
    ctx.cookies.set('user_type', userInfo.user_type, cookieOpts);
    delete userInfo.password;
    ctx.body = {code: 0, data: userInfo};
  } else {
    ctx.body = {code: 1, msg: '密码错误!'};
  }
  // await next();
});

apiRouter.get('/prize/list', async (ctx, next) => {
  let response = await prizeDBAction.getPrize();
  ctx.body = {code: 0, response: response}
})

module.exports = [apiRouter.routes()];
