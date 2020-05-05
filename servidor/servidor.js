//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('./controladores/controlador.js');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.get("/peliculas", controlador.buscarPeliculas);
app.get('/peliculas/recomendacion', controlador.recomendarPelicula);
app.get("/generos", controlador.mostrarGeneros);
app.get("/peliculas/:id", controlador.mostrarInfoPeliculas);
//seteamos el puerto en el cual va a escuchar los pedidos la aplicación

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

