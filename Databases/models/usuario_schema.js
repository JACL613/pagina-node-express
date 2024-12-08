const  {Schema , model, mongoose} = require('mongoose')

const UsuarioSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true},
    role: {type: String , required: true, default:"user", enum: ['user', 'admin']},
    created_at: {type: Date, required: true , default: new Date()},
})


const Users = model('Users' ,UsuarioSchema)

module.exports = Users