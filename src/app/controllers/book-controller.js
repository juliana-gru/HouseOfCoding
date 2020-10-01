const BookDao = require('../../infra/book-dao');
const db = require('../../config/database');

const { validationResult } = require('express-validator');

const templates = require('../views/templates');

class BookController {
  static routes() {
    return {
      authenticate:'/livros*',
      list: '/livros',
      register: '/livros/form',
      edition: '/livros/form/:id',
      removal: '/livros/:id',
    }
  };

  list() {
    return function (req, res) {
      const bookDao = new BookDao(db);
      console.log('list')
      bookDao.list().then(livros => {
        res.marko(
          templates.books.list,
          {
            livros: livros
          }
        )
      }).catch(error => console.log(error)); 
    }      
  };

  registerForm() {
    return function (req, res) {
      res.marko(templates.books.form, {livro: {}});
    }
  };

  editorForm() {
    return function (req, res) {
      const { id } = req.params;

      const bookDao = new BookDao(db);
      bookDao.searchById(id).then(livro => {
        res.marko(
          templates.books.form,
          { livro: livro }
        )
      }).catch(error => console.log(error));
    }
  };

  add() {
    return function (req, res) {
      const bookDao = new BookDao(db);
        
      const errors = validationResult(req);
    
      if (!errors.isEmpty()) {
        return res.marko(
          templates.books.form,
          { livro: {},
            validationErrors: errors.array()
          }
        )
      }
    
      bookDao.add(req.body)
        .then(res.redirect(BookController.routes().list))
        .catch(error => console.log(error));
    }
  };
  
  update() {
    return function (req, res) {
      const livro = req.body;
  
      const bookDao = new BookDao(db);
      bookDao.update(livro).then(res.redirect(BookController.routes().list))
      .catch(error => console.log(error));
    }
  };

  remove() {
    return function (req, res) {
      const id = req.params.id;
  
      const bookDao = new BookDao(db);
      bookDao.remove(id).then(() => res.status(200).end())
      .catch(error => console.log(error));
    }
  };
}

module.exports = BookController;