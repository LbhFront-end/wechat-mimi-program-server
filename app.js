require('module-alias/register');

const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const InitManager = require('@core/init');
const catchError = require('@middlewares/exception')
const static = require('koa-static');

require('@model')

const app = new Koa();
app.use(catchError);
app.use(bodyParser())
app.use(static(path.join(__dirname, './static')))
InitManager.initCore(app);

app.listen(3000)