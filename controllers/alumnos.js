const Alumno = require('../models/alumno')
const getAlumnos = (req, res) => {
    res.json({
        ok: true,
        msg: 'ey'
    })
}

const postAlumno = async(req, res) => {

    //console.log(req.body);
    const { Id, Nombre, Apellidos, Genero, Fnacimiento } = req.body
    const alumno = new Alumno(req.body)
    await alumno.save();
    res.json({
        ok: true,
        alumno
    })
}

module.exports = {
    getAlumnos,
    postAlumno
}