const { Schema, model } = require('mongoose');

const AlumnogradoSchema = Schema({

    AlumnoId: {
        type: String,
        required: false
    },
    GradoId: {
        type: String,
        required: false
    },
    Seccion: {
        type: String,
        required: false
    },
    NombreGrado: {
        type: String,
        required: false
    },
    NombreAlumno: {
        type: String,
        required: false
    }
})

module.exports = model('Alumnogrado', AlumnogradoSchema);