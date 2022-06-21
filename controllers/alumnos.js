const Alumno = require('../models/alumno')
const Alumnogrado = require('../models/alumnogrado')
const { validationResult } = require('express-validator')



const getAlumnos = async(req, res) => {
    const alumnos = await Alumno.find();
    res.json({
        ok: true,
        alumnos
    })
}

const getAlumno = async(req, res) => {
    const id = req.params.id
    if (id.toString().length !== 24) {
        return res.json({
            ok: false,
            msg: 'El id no es valido',
        })
    }
    const alumno = await Alumno.findById(id);
    return res.json({
        alumno
    })
}

const postAlumno = async(req, res) => {

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
        msg: 'El alumno fue creado exitosamente',
        alumno
    })
}

const putAlumno = async(req, res) => {
    const id = req.params.id;
    try {
        if (id.toString().length !== 24) {
            return res.json({
                ok: false,
                msg: 'El id no es valido',
            })
        }
        const alumno = await Alumno.findById(id);
        if (!alumno) {
            return res.json({
                ok: false,
                msg: 'Alumno no encontrado',
            })
        }

        const alumnoActualizado = await Alumno.findByIdAndUpdate(id, req.body);
        res.json({
            ok: true,
            msg: 'Alumno actualizado exitosamente',
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
            return res.json({
                ok: false,
                msg: 'Alumno no encontrado',
            })
        }

        const alumnosgrados = await Alumnogrado.find();
        if (!alumnosgrados) {
            const alumnoActualizado = await Alumno.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: 'Alumno borrado',
                res: alumnoActualizado
            })
        } else {
            for (const prop in alumnosgrados) {
                if (alumnosgrados[prop].AlumnoId === id) {
                    return res.json({
                        ok: false,
                        msg: 'No se puede borrar el alumno porque pertenece a un Alumnogrado, elimine el Alumnogrado primero',
                    })
                }
            }
            const alumnoActualizado = await Alumno.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: 'Alumno borrado',
                res: alumnoActualizado
            })
        }

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getAlumnos,
    postAlumno,
    putAlumno,
    delAlumno,
    getAlumno
}