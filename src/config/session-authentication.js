const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserDao = require('../infra/user-dao');
const db = require('../config/database');

module.exports = app => {

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha'
    },
    (email, senha, done) => {
      const userDao = new UserDao(db);

      userDao.searchByEmail(email)
        .then(user => {

          if (!user || senha != user.senha) {
            return done(null, false, {
              message: 'User or password incorrect.'
            });
          }

          return done(null, user);
        })
        .catch(error => done(error, false));
    } 
  ));

  passport.serializeUser((user, done) => {
    const userSession = {
      name: user.nome_completo,
      email: user.email
    };
    done(null, userSession);
  });

  passport.deserializeUser((userSession, done) => {
    done(null, userSession);
  });

  app.use(session({
    secret:'node alura',
    genid: function(req) {
      return uuid();
    },
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    req.passport = passport; //Dependency injection    
    next();
  })
  
}