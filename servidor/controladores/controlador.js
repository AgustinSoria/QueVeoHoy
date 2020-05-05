var conexion = require('../lib/conexionbd');

function buscarPeliculas(req, res) {

    let titulo = req.query.titulo;
    let anio = req.query.anio;
    let genero = req.query.genero;
    let columnaOrden = req.query.columna_orden;
    let tipoOrden = req.query.tipo_orden;
    let pagina = req.query.pagina;
    let cantidad = req.query.cantidad;
    let where = `1 = 1`;

    if (genero) {
        where += ` and pelicula.genero_id = ${genero} `;
    }
    if (anio) {
        where += ` and anio = ${anio} `;
    }
    if (titulo) {
        where += ` and titulo like '%${titulo}%' `;
    }

    let sqlQuery = `select * from pelicula where ${where} order by ${columnaOrden} ${tipoOrden}`;

    let sqlQueryLimit = sqlQuery + ` LIMIT ${(pagina - 1) * cantidad},${cantidad}`;

    conexion.query(sqlQueryLimit, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");

        }
        var peliculasFiltradas = resultado;
        conexion.query(sqlQuery, function (error, resultado, fields) {

            if (error) {
                console.log(error);
                return res.status(404).send("Hubo un error con tu consulta");
            }

            let totalPeliculasFiltradas = resultado.length;

            var response = {
                'peliculas': peliculasFiltradas,
                'total': totalPeliculasFiltradas
            };
            // console.log('sqlQuery', sqlQuery);

            res.send(JSON.stringify(response));
            // console.log(response);

        });
    })
}


function mostrarGeneros(req, res) {

    var sqlQuery = "select * from genero";
    conexion.query(sqlQuery, function (error, resultado, fields) {
        if (error) {
            console.log(error);
            return res.status(404).send("Hubo un error con tu consulta");
        }
        var response = {
            'generos': resultado,
        }
        res.send(JSON.stringify(response));
    })

}

function mostrarInfoPeliculas(req, res) {

    let id = req.params.id;

    let queryGenero = `SELECT * FROM pelicula JOIN genero ON genero_id = genero.id WHERE pelicula.id = ${id}`



    conexion.query(queryGenero, function (error, resultadoPelicula, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");

        }
        let queryActores = `SELECT * FROM actor_pelicula JOIN actor ON actor_id = actor.id WHERE pelicula_id = ${id}`

        conexion.query(queryActores, function (error, resultadoActores, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");

            }


            var response = {
                'pelicula': resultadoPelicula[0],
                'genero': resultadoPelicula[0].nombre,
                'actores': resultadoActores
            };

            res.send(JSON.stringify(response));
            console.log(response);

        });
    });



}

function recomendarPelicula(req, res) {

    let genero = req.query.genero;
    let anio_inicio = req.query.anio_inicio;
    let anio_fin = req.query.anio_fin;
    let puntuacion = req.query.puntuacion;
    let where = `1 = 1`;
    if (genero) {
      where += ` and genero.nombre = "${genero}"`;
    }

    if (anio_inicio && anio_fin) {
        where += ` and pelicula.anio between ${anio_inicio} and ${anio_fin}`;
    }

    if (puntuacion) {
        where += ` and pelicula.puntuacion > ${puntuacion} `;
    }

    let sqlQuery = `select * from pelicula join genero ON genero_id = genero.id where ${where}`

    console.log(sqlQuery);

    conexion.query(sqlQuery, function (error, resultado, fields) {
        if (error) {
            console.log(sqlQuery);
            console.log(error);
            return res.status(404).send("Hubo un error con tu consulta");
        }
        var response = {
            'peliculas': resultado,
        }
        res.send(JSON.stringify(response));
    })

}

module.exports = {
    buscarPeliculas: buscarPeliculas,
    mostrarGeneros: mostrarGeneros,
    mostrarInfoPeliculas: mostrarInfoPeliculas,
    recomendarPelicula: recomendarPelicula
};