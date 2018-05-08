/**
 * Created by Kevin on 7/16/17.
 */

const KoaRouter = require('koa-router')
const LeftPad = require("left-pad")
const UserDBAction = require('../database/UserDBAction')

const apiRouter = KoaRouter({
	prefix: '/api'
})
const userDBAction = new UserDBAction();


apiRouter.get('/user', async (ctx, next) => {
	let id = ctx.query.id;
	let userInfo = await userDBAction.getUserByNameAndJobNumber(id);
	if (userInfo) {
		ctx.body = { code: 0, data: userInfo };
	} else {
		ctx.body = { code: 1, data: '找不到用户' }
	}
});

module.exports = [apiRouter.routes()];
