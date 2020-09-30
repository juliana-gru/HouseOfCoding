const templates = require('../views/templates');

class BaseController {
  static routes() {
    return {
      home: '/',
      login: '/login'
    }
  }
  
  home() {
    return function(req, res) {
      res.marko(templates.base.home);      
    }
  }

  loginPage() {
    return function(req, res) {
      res.marko(templates.base.login);      
    }
  }

  login() {
    return function(req, res) {
      //res.marko(templates.base.login);
    }

  }


}

module.exports = BaseController;