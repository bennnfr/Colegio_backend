const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    /*  Id: {
          type: String,
          required: true
      }, */
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
    },
    Fnacimiento: {
        type: Date,
        required: true
    },
})

module.exports = model('Alumnos', AlumnoSchema);