import express from 'express';

const app = express();

//SERVIR CONTENIDO ESTATTICO

app.use( express.static('public') )

app.get('/hola-mundo', function (req, res) {
  res.send('Hola mundo en su respectuva ruta')
})

app.get('*', function (req, res) {
  res.send('404')
})

app.listen(8080)