const { Schema, model } = require('mongoose');

const GradoSchema = Schema({

    Nombre: {
        type: String,
        required: true
    },
    ProfesorId: {
        type: String,
        required: true
    },
    NombreProfesor: {
        type: String,
        required: true
    }
})

module.exports = model('Grados', GradoSchema);