module.exports = app => {
  app.get('/', (req, res) => {
    res.send(`
    <html>
      <body>
        <h1>Olha Elaaaa</h1>
      </body>
    </html>
  `);
  });
  
  app.get('/livros', (req, res) => {
    res.send(`
    <html>
      <body>
        <h1>Listageeeemm de OLHA ELAAAA</h1>
      </body>
    </html>
  `);
  });
}