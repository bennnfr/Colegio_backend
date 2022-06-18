const { Schema, model } = require('mongoose');

const ProfesorSchema = Schema({

    Nombre: {
        type: String,
        required: true
    },
    Apellidos: {
        type: String,
        required: true
    },
    Genero: {
        type: String,
        required: true
    }
})

module.exports = model('Profesores', ProfesorSchema);