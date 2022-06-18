const Profesor = require('../models/profesor')
const { validationResult } = require('express-validator')



const getProfesores = async(req, res) => {
    const profesores = await Profesor.find();
    res.json({
        ok: true,
        profesores
    })
}

const getProfesor = async(req, res) => {
    const profesor = await Profesor.findById(req.params.id);
    res.json({
        profesor
    })
}

const postProfesor = async(req, res) => {

    // const { Id, Nombre, Apellidos, Genero, Fnacimiento } = req.body
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: err.mapped()
        });
    }
    const profesor = new Profesor(req.body)
    await profesor.save();
    res.json({
        ok: true,
        profesor
    })
}

const putProfesor = async(req, res) => {
    const id = req.params.id;
    try {
        const profesor = await Profesor.findById(id);
        if (!profesor) {
            return res.status(404).json({
                mensaje: 'Profesor no encontrado'
            })
        }

        const profesorActualizado = await Profesor.findByIdAndUpdate(id, req.body);
        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error);
    }

}

const delProfesor = async(req, res) => {
    const id = req.params.id;
    try {
        const profesor = await Profesor.findById(id);
        if (!profesor) {
            return res.status(404).json({
                mensaje: 'Profesor no encontrado'
            })
        }

        const profesorActualizado = await Profesor.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Profesor borrado',
            res: profesorActualizado
        })
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getProfesores,
    postProfesor,
    putProfesor,
    delProfesor,
    getProfesor
}