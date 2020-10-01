const BookController = require('./book-controller');

const templates = require('../views/templates');

class BaseController {
  static routes() {
    return {
      home: '/',
      login: '/login',
      signup: '/signup'
    }
  }
  
  home() {
    return function(req, res) {
      res.marko(templates.base.home);      
    }
  }

  signupPage() {
    return function(req, res) {
      res.marko(templates.base.signup);
    }
  }

  signup() {
    return function(req, res) {
      res.marko(templates.base.signup);
    }
  }

  loginPage() {
    return function(req, res) {
      res.marko(templates.base.login);   
    }
  }

  login() {
    return function(req, res, next) {
      const passport = req.passport;
      //
      console.log('chegou no login');
      // console.log(passport);
      passport.authenticate('local', (error, user, info) => {
        console.log(user);
        if (info) res.marko(templates.base.login);
        else if (error) next(error);
        
        req.login(user, (error) => {
          if (error) next(error);
          return res.redirect(BookController.routes().list);
        });
      })(req, res, next); // ??? 
    }
  }
}

module.exports = BaseController;