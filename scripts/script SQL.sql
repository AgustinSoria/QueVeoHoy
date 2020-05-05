create database peliculas;

use peliculas;

create table pelicula(
id INT NOT NULL AUTO_INCREMENT,
titulo VARCHAR(100),
duracion INT(5),  
director VARCHAR(400),
anio INT(5),
fecha_lanzamiento DATE,
puntuacion INT(2),
poster VARCHAR(300),
trama VARCHAR(700),
PRIMARY KEY(id)
);

create table genero(
id INT NOT NULL AUTO_INCREMENT,
nombre varchar(30),
PRIMARY KEY (id)
);

ALTER TABLE pelicula ADD column genero_id INT after anio; 
ALTER TABLE pelicula ADD FOREIGN KEY(genero_id) references genero(id);

create table actor(
id INT NOT NULL AUTO_INCREMENT,
nombre varchar(70),
PRIMARY KEY (id)
);

create table actor_pelicula(
id INT NOT NULL AUTO_INCREMENT,
actor_id int NOT NULL,
pelicula_id int NOT NULL,
primary key (id),
foreign key (actor_id) references actor(id),
foreign key (pelicula_id) references pelicula(id)
);

