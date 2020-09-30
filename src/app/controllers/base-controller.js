class BaseController {
  static routes() {
    return {
      home: '/'
    }
  }
  
  home(req, res) {
    return function(req, res) {
      res.marko(require('../views/base/home/home.marko'));
    }
  }
}

module.exports = BaseController;