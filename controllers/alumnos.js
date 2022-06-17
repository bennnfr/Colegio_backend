const Alumno = require('../models/alumno')
const { validationResult } = require('express-validator')



const getAlumnos = async(req, res) => {
    const alumnos = await Alumno.find();
    res.json({
        ok: true,
        alumnos
    })
}

const postAlumno = async(req, res) => {

    // const { Id, Nombre, Apellidos, Genero, Fnacimiento } = req.body
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: err.mapped()
        });
    }
    const alumno = new Alumno(req.body)
    await alumno.save();
    res.json({
        ok: true,
        alumno
    })
}

const putAlumno = async(req, res) => {
    const id = req.params.id;
    try {
        const alumno = await Alumno.findById(id);
        if (!alumno) {
            return res.status(404).json({
                mensaje: 'Alumno no encontrado'
            })
        }

        const alumnoActualizado = await Alumno.findByIdAndUpdate(id, req.body);
        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error);
    }

}

const delAlumno = async(req, res) => {
    const id = req.params.id;
    try {
        const alumno = await Alumno.findById(id);
        if (!alumno) {
            return res.status(404).json({
                mensaje: 'Alumno no encontrado'
            })
        }

        const alumnoActualizado = await Alumno.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Alumno borrado',
            res: alumnoActualizado
        })
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getAlumnos,
    postAlumno,
    putAlumno,
    delAlumno
}