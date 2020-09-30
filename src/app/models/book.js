const { check } = require('express-validator/check');

class Book {
  static validations() {
    return [
      check('titulo').isLength({ min: 5}).withMessage('Requires a minimum of 5 characters.'),
      check('preco').isCurrency().withMessage('Requires a valid currency value.')
    ];
  }
}

module.exports = Book;