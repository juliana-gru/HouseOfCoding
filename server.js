const express = require('express');

const app = express();

app.listen(3000, () => console.log('Server is running on port 3000') )


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