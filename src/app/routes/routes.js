const { check } = require('express-validator/check');

const BookController = require('../controllers/book-controller');
const bookController = new BookController();

const BaseController = require('../controllers/base-controller');
const baseController = new BaseController();

module.exports = app => {
  const baseRoutes = BaseController.routes();
  const bookRoutes = BookController.routes();

  app.get(baseRoutes.home, baseController.home());
  
  app.get(bookRoutes.list, bookController.list());

  app.get(bookRoutes.register, bookController.registerForm());
  
  app.get(bookRoutes.edition, bookController.editorForm());  

  app.post(bookRoutes.list, [
    check('titulo').isLength({ min: 5}).withMessage('Requires a minimum of 5 characters.'),
    check('preco').isCurrency().withMessage('Requires a valid currency value.')
  ], bookController.add());

  app.put(bookRoutes.list, bookController.update());

  app.delete(bookRoutes.removal, bookController.remove());
}


 