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
        required: false
    }
})

module.exports = model('Grados', GradoSchema);