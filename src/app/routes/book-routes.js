const BookController = require('../controllers/book-controller');
const bookController = new BookController();

const Book = require('../models/book');

const BaseController = require('../controllers/base-controller');

module.exports = app => {  
  const bookRoutes = BookController.routes();
  
  app.use(bookRoutes.authenticate, (req, res, next) => {
    if (req.isAuthenticated()) next()
    else res.redirect(BaseController.routes().login);
  })
  
  app.get(`${bookRoutes.list}`, bookController.list());
  
  app.route(bookRoutes.register)
    .get(bookController.registerForm())
    .post(Book.validations(), bookController.add())
    .put(bookController.update());
  
  app.get(bookRoutes.edition, bookController.editorForm());  
 
  app.delete(bookRoutes.removal, bookController.remove());
}
