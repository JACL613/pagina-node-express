const { Schema , model, default: mongoose} = require('mongoose');
const Categorias = require('./categorias_schema');


const PeliculasShema = new Schema({
    title: {type:String, require: true},
    descripcion: {type:String, require: true},
    genero: {type:[mongoose.Types.ObjectId | String], ref: 'Categorias' , require: true},
    actores: [String],
    calificacion : Number,
    fecha_publicacion: Date,
    imagen_url: String,
    duration:String,
    coverImage:String,
    backdropImage: String,
})
PeliculasShema.pre('save', async function (next){
    const pelicula = this 

    if(!pelicula)return next()
    
    await Categorias.updateMany({_id: pelicula.genero}, {
        $addToSet: {peliculas: pelicula._id}
    })
    
})

PeliculasShema.pre('findOneAndDelete', async function (next) {
    const pelicula = this
    if(!pelicula) return next()
    
    await Categorias.updateMany({_id: pelicula.genero}, {
        $pull:{peliculas: pelicula._id}
    })
})

const Peliculas = model( 'Peliculas' , PeliculasShema)

module.exports = Peliculas