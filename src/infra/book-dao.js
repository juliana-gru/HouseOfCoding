const { resolve } = require("path");

class BookDao {
  constructor(db) {
    this._db = db; 
  }

  list() {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM livros',
        (error, results) => {
          if (error) reject('Nao foi possivel listar os livros.');
          return resolve(results);
        }
      )
    })    
  }

  searchById(id) {
    return new Promise((resolve, reject) => {
      this._db.get(
        `SELECT * FROM livros WHERE id = ?`,
        [id],
        (error, book) => {
          if (error) reject('Nao foi encontrado esse livro.');
          return resolve(book);
        }
      )
    })
  }

  add(book) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        INSERT INTO livros (
          titulo,
          preco,
          descricao
        ) values (?,?,?)
        `,[
          book.titulo,
          book.preco,
          book.descricao
        ], 
        error => {
          if (error) reject('Nao foi possivel adicionar o livro.');
          resolve();
        }
      )
    })
  }

  update(book) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        UPDATE livros SET 
        titulo = ?, 
        preco = ?,
        descricao = ?
        WHERE id = ?
      `, [
        book.titulo,
        book.preco,
        book.descricao,
        book.id
      ])
    }, 
    error => {
      if (error) reject('A atualizacao do livro falhou.');
      return resolve();
    })
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run(`DELETE FROM livros WHERE id = ?`,
        [id], 
        error => {
          if (error) reject('A delecao do livro falhou.');
          return resolve();
        }
      )
    }) 
  }
}

module.exports = BookDao;