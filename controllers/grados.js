const Grado = require('../models/grados')
const Profesor = require('../models/profesor')
const Alumnogrado = require('../models/alumnogrado')
const { validationResult } = require('express-validator')


//
const getGrados = async(req, res) => {
    const grados = await Grado.find();
    for (const prop in grados) {
        let prof = await Profesor.findById(grados[prop].ProfesorId);
        if (prof === null) {
            grados[prop].NombreProfesor = 'Profesor no asignado'
            grados[prop].ProfesorId = 'Id profesor no asignado'
        } else {
            grados[prop].NombreProfesor = prof.Nombre
        }

    }

    res.json({
        ok: true,
        grados
    })
}

const getGrado = async(req, res) => {
    const id = req.params.id
    if (id.toString().length !== 24) {
        return res.json({
            ok: false,
            msg: 'El id no es valido',
        })
    }
    const grado = await Grado.findById(id);
    return res.json({
        grado
    })
}

const postGrado = async(req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: err.mapped()
        });
    }
    const grado = new Grado(req.body)
    await grado.save();
    res.json({
        ok: true,
        msg: 'Grado creado correctamente',
        grado
    })
}

const putGrado = async(req, res) => {
    const id = req.params.id;
    try {
        if (id.toString().length !== 24) {
            return res.json({
                ok: false,
                msg: 'El id no es valido',
            })
        }
        const grado = await Grado.findById(id);
        if (!grado) {
            return res.status(404).json({
                mensaje: 'Grado no encontrado'
            })
        }

        const gradoActualizado = await Grado.findByIdAndUpdate(id, req.body);
        res.json({
            ok: true,
            msg: 'Grado actualizado correctamente'
        })
    } catch (error) {
        console.log(error);
    }

}

const delGrado = async(req, res) => {
    const id = req.params.id;
    try {
        if (id.toString().length !== 24) {
            return res.json({
                ok: false,
                msg: 'El id no es valido',
            })
        }
        const grado = await Grado.findById(id);
        if (!grado) {
            return res.json({
                ok: true,
                msg: 'Grado no encontrado',
            })
        }

        ///
        const alumnosgrados = await Alumnogrado.find();
        if (!alumnosgrados) {
            const gradoActualizado = await Grado.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: 'Grado borrado',
                res: gradoActualizado
            })
        } else {
            for (const prop in alumnosgrados) {
                if (alumnosgrados[prop].GradoId === id) {
                    return res.json({
                        ok: false,
                        msg: 'No se puede borrar el grado porque pertenece a un Alumnogrado, elimine el Alumnogrado primero',
                    })
                }
            }
            const gradoActualizado = await Grado.findByIdAndDelete(id);
            res.json({
                ok: true,
                msg: 'Grado borrado',
                res: gradoActualizado
            })
        }
        ///


    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getGrados,
    postGrado,
    putGrado,
    delGrado,
    getGrado
}