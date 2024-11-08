const routesBasic = require('express').Router();
const path = require('path');
const Peliculas = require('../models/peliculaSchema');
// const webHome = require('../../views/index.html')

routesBasic.get('/', async (req, res) => {
    try {
        const query = await Peliculas.find({})
        if(query.length <= 0) return res.json({message: 'No hay peliculas', status: 404})
        
        res.json({message: 'Peliculas encontradas', status: 200, data: query})
    } catch (error) {
        res.json({error, status: 500})
    }
    // res.send('Bienvenido a la API')
})
routesBasic.get('/:id', async (req, res) => {
    const {id} = req.params

    if(!id)
        return res.json({message: 'error: Faltan datos en la petición', status : 404})
    try {
        const query = await Peliculas.findById(id)
        if(query.length <= 0) return res.json({message: 'No hay peliculas', status: 404})
        
        res.json({message: 'Pelicula encontrada', status: 200, data: query})
    } catch (error) {
        res.json({error, status: 500})
    }
    // res.send('Bienvenido a la API')
})
routesBasic.post('/', async (req, res) => {

    const {title, descripcion, genero, calificacion, fecha_publicacion, actores ,  duration, coverImage, backdropImage} = req.body
    if (!title|| !descripcion || !genero || !calificacion || !fecha_publicacion)
        return res.json({message: 'error: Faltan datos en la petición', status : 404})

    try {
        const query = await Peliculas.create({title, descripcion, genero, actores, calificacion, fecha_publicacion , duration, coverImage, backdropImage})
        if(!query) return res.json({message: 'error: No se pudo guardar la pelicula', status : 404}) 

        return res.json({message: 'Pelicula registrada', status: 200 ,data: query})
    } catch (error) {
        return res.json({message: error.message, status: error.status})
    }
})

routesBasic.put('/:id', async (req, res) => {
    const {data} = req.body
    const {id} = req.params
    console.log(data, id);
    
    if( !id || !data)
        return res.json({message: 'error: Faltan datos en la petición', status : 404})

    try {
        const query = await Peliculas.findByIdAndUpdate(id, {...data})
        if(!query) return res.json({message: 'error: No se pudo actualizar la pelicula', status : 404}) 

    return res.json({message: 'Pelicula actualizada', status: 200 ,data: query})

    } catch (error) {
        return res.json({message: error.message, status: error.status})
    }
})

routesBasic.delete('/:id', async (req, res) => {
    const {id} = req.params

    if(!id)return res.json({message: 'error: Faltan datos en la petición', status : 404})

    try {
        const query = await Peliculas.findByIdAndDelete(id)
        if(!query) return res.json({message: 'error: No se pudo eliminar la pelicula', status : 404}) 

    return res.json({message: 'Pelicula eliminada', status: 200 ,data: query})
        
    } catch (error) {
        return res.json({message: error.message, status: error.status})
    }
})
module.exports = routesBasic