const { check } = require('express-validator/check');

const BookController = require('../controllers/book-controller');
const bookController = new BookController();

const BaseController = require('../controllers/base-controller');
const baseController = new BaseController();

module.exports = app => {
  app.get('/', baseController.home());
  
  app.get('/livros', bookController.list());

  app.get('/livros/form', bookController.registerForm());
  
  app.get('/livros/form/:id', bookController.editorForm());  

  app.post('/livros', [
    check('titulo').isLength({ min: 5}).withMessage('Requires a minimum of 5 characters.'),
    check('preco').isCurrency().withMessage('Requires a valid currency value.')
  ], bookController.add());

  app.put('/livros', bookController.update())

  app.delete('/livros/:id', bookController.remove())
}


 