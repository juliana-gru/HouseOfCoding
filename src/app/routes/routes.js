const BookDao = require('../../infra/book-dao');
const db = require('../../config/database');

module.exports = app => {
  app.get('/', (req, res) => {
    res.marko(require('../views/base/home/home.marko'));
  });
  
  app.get('/livros', (req, res) => {
    const bookDao = new BookDao(db);

    bookDao.list().then(livros => {
      res.marko(
        require('../views/books/list/list.marko'),
        {
          livros: livros
        }
      )
    }).catch(error => console.log(error));    
  });

  app.get('/livros/form', (req, res) => {
    res.marko(require('../views/books/form/form'), {livro: {}});
  });
  
  app.get('/livros/form/:id', (req, res) => {
    const { id } = req.params;

    const bookDao = new BookDao(db);
    bookDao.searchById(id).then(livro => {
      res.marko(
        require('../views/books/form/form.marko'),
        { livro: livro }
      )
    }).catch(error => console.log(error));    
  });  

  app.post('/livros', (req,res) => {    
    const bookDao = new BookDao(db);
    bookDao.add(req.body)
    .then(res.redirect('/livros'))
    .catch(error => console.log(error));
  });

  app.put('/livros', (req, res) => {
    const livro = req.body;

    const bookDao = new BookDao(db);
    bookDao.update(livro).then(res.redirect('/livros'))
    .catch(error => console.log(error));
  })

  app.delete('/livros/:id', (req, res) => {
    const id = req.params.id;

    const bookDao = new BookDao(db);
    bookDao.remove(id).then(() => res.status(200).end())
    .catch(error => console.log(error));
  })
}


 