const Alumnogrado = require('../models/alumnogrado')
const Grado = require('../models/grados')
const Alumno = require('../models/alumno')
const { validationResult } = require('express-validator')

//

const getAlumnosGrados = async(req, res) => {
    const alumnosgrados = await Alumnogrado.find();
    for (const prop in alumnosgrados) {
        let grad = await Grado.findById(alumnosgrados[prop].GradoId);
        let alu = await Alumno.findById(alumnosgrados[prop].AlumnoId);
        if (grad === null || grad.length === 0) {
            alumnosgrados[prop].NombreGrado = 'Grado no asignado'
            alumnosgrados[prop].GradoId = 'Id Grado no asignado'
        } else {
            alumnosgrados[prop].NombreGrado = grad.Nombre
        }
        if (alu === null) {
            alumnosgrados[prop].NombreAlumno = 'Alumno no asignado'
            alumnosgrados[prop].AlumnoId = 'Id Alumno no asignado'
        } else {
            alumnosgrados[prop].NombreAlumno = alu.Nombre
        }

    }
    res.json({
        ok: true,
        alumnosgrados
    })
}

const getAlumnoGrado = async(req, res) => {
    const id = req.params.id
    if (id.toString().length !== 24) {
        return res.json({
            ok: false,
            msg: 'El id no es valido',
        })
    }
    const alumnogrado = await Alumnogrado.findById(id);
    res.json({
        alumnogrado
    })
}

const postAlumnoGrado = async(req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: err.mapped()
        });
    }
    const alumnogrado = new Alumnogrado(req.body)
    await alumnogrado.save();
    res.json({
        ok: true,
        msg: 'Alumno grado creado exitosamente',
        alumnogrado
    })
}

const putAlumnoGrado = async(req, res) => {
    const id = req.params.id;
    try {

        if (id.toString().length !== 24) {
            return res.json({
                ok: false,
                msg: 'El id no es valido',
            })
        }
        const alumnogrado = await Alumnogrado.findById(id);
        if (!alumnogrado) {
            return res.json({
                ok: false,
                msg: 'Alumno grado no encontrado',
            })
        }

        const alumnogradoActualizado = await Alumnogrado.findByIdAndUpdate(id, req.body);
        res.json({
            ok: true,
            msg: 'El alumno grado fue creado con exito'
        })
    } catch (error) {
        console.log(error);
    }

}

const delAlumnoGrado = async(req, res) => {
    const id = req.params.id;
    try {
        if (id.toString().length !== 24) {
            return res.json({
                ok: false,
                msg: 'El id no es valido',
            })
        }
        const alumnogrado = await Alumnogrado.findById(id);
        if (!alumnogrado) {
            return res.json({
                ok: false,
                msg: 'Alumno grado no encontrado',
            })
        }

        const alumnogradoActualizado = await Alumnogrado.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Alumnogrado borrado',
            res: alumnogradoActualizado
        })
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getAlumnosGrados,
    postAlumnoGrado,
    putAlumnoGrado,
    delAlumnoGrado,
    getAlumnoGrado
}