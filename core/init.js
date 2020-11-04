const Router = require('koa-router');
const requireDirectory = require('require-directory');
const router = new Router();

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.loadConfig();
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js';
    const config = require(configPath);
    global.config = config;
  }

  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`;

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes()).use(router.allowedMethods())
      }
    }

    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })
  }

  static loadHttpException() {
    const errors = require('./http-exception');
    global.errs = errors;
  }

}

module.exports = InitManager