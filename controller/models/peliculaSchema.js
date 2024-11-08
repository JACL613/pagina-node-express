const { Schema , model} = require('mongoose');


const PeliculasShema = new Schema({
    titulo: {type:String, require: true},
    descripcion: {type:String, require: true},
    genero: [String],
    actores: [String],
    calificacion : Number,
    fecha_publicacion: Date,
    imagen_url: String,
    duration:String,
    coverImage:String,
    backdropImage: String,
})

const Peliculas = model( 'Peliculas' , PeliculasShema)

module.exports = Peliculas