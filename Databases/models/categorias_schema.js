const {Schema, model, default: mongoose} = require('mongoose')

const CategorysSchema = new Schema( {
    name: {type: String, required: true},
    total_peliculas: {type: Number, required: true, default: 0},
    peliculas: {type: [mongoose.Types.ObjectId], ref: 'Peliculas'}
})

const Categorias =  model( 'Categorias',CategorysSchema)

module.exports = Categorias