const BookDao = require('../../infra/book-dao');
const db = require('../../config/database');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send(`
    <html>
      <body>
        <h1>House of Coding</h1>
      </body>
    </html>
  `);
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
    res.marko(require('../views/books/form/form'));
  });
  
  app.get('/livros/:id', (req, res) => {
    const { id } = req.params.id;

    const bookDao = new BookDao(db);
    bookDao.searchById(id).then(livro => {
      res.marko(
        require('../views/books/list/list.marko'),
        {
          livro
        }
      )
    }).catch(error => console.log(error));    
  });  

  app.post('/livros', (req,res) => {    
    const bookDao = new BookDao(db);
    bookDao.add(req.body)
    .then(res.redirect('/livros'))
    .catch(error => console.log(error));
  });

  app.put('/livros/:id', (req, res) => {
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


 