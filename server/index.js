global.CONFIG = require('./config');
const winston = require('winston');

var transports = [];
transports.push(new (winston.transports.File)( {
	filename: 'output.log',
	level: 'info'
}));
// 目前暂时将日志输出至Console，后期生产环境中建议移除
transports.push(new (winston.transports.Console)({
	level: 'info'
}));
global.LOGGER = new (winston.Logger)({
	transports: transports
});

global.DEBUG = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

if (!DEBUG){
	winston.handleExceptions(new winston.transports.File({ filename: 'error.log' }))
}

const Koa = require('koa')
const cors = require('kcors');
const KoaBodyparser = require('koa-bodyparser');
const KoaOnerror = require('koa-onerror');
const { Nuxt, Builder } = require('nuxt')
const myRouters = require('./router')
const KoaCompose = require('koa-compose');

global.CONFIG = require('./config');

const app = new Koa()

// Start nuxt.js
async function start() {
	// Import and Set Nuxt.js options
	let config = require('../nuxt.config.js')
	config.dev = DEBUG;
	// Instanciate nuxlst.js
	const nuxt = await new Nuxt(config)
	// Build in development
	if (config.dev) {
	  try {
	    new Builder(nuxt).build()
	  } catch (e) {
	    console.error(e) // eslint-disable-line no-console
	    process.exit(1)
	  }
    }
	app.use(cors());
	app.use(KoaBodyparser());
	KoaOnerror(app);

	app.use(async (ctx, next) => {
		if (ctx.request.method == 'POST') {
			LOGGER.info(`POST Body: ${JSON.stringify(ctx.request.body)}`);
		}
		var start = new Date();
		await next();
		var ms = new Date() - start;
		LOGGER.info(`${ctx.request.method} ${ctx.request.url} ${ms}ms`);
	})

	app.use(KoaCompose(myRouters));

	app.use(async (ctx, next) => {
	  ctx.status = 200 // koa defaults to 404 when it sees that status is unset
	  await nuxt.render(ctx.req, ctx.res)
	})

	app.on('error', function(err){
		LOGGER.error(err);
	})

	const host = CONFIG.host || '127.0.0.1'
	const port = CONFIG.port || 3004
	app.listen(port, '0.0.0.0')
	console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
