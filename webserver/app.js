import express from 'express';
import { fileURLToPath } from 'url';
import hbs from "hbs";
import * as dotenv from 'dotenv';
dotenv.config();

// DIR
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.PORT;

// HBS

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

//SERVIR CONTENIDO ESTATTICO

app.use( express.static('public') )


// -- 
app.get('/', function (req, res) {
  res.render('home', {
    titulo: 'Curso Node',
    nombre: 'Liska Loaiza'
  });
});


app.get('/generic', function (req, res) {
  res.render('generic', {
    titulo: 'Curso Node',
    nombre: 'Liska Loaiza'
  });
});
app.get('/elements', function (req, res) {
  res.render('elements', {
    titulo: 'Curso Node',
    nombre: 'Liska Loaiza'
  });
});

app.get('*', function (req, res) {
  res.sendFile( __dirname +'/public/404.html')
});

app.listen(port)