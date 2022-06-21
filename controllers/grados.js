const Grado = require('../models/grados')
const Profesor = require('../models/profesor')
const { validationResult } = require('express-validator')


//
const getGrados = async(req, res) => {
    const grados = await Grado.find();
    for (const prop in grados) {
        if (!grados[prop].ProfesorId === 'Id profesor no asignado') {
            let prof = await Profesor.findById(grados[prop].ProfesorId);
            if (prof === null) {
                grados[prop].NombreProfesor = 'Profesor no asignado'
                grados[prop].ProfesorId = 'Id profesor no asignado'
            } else {
                grados[prop].NombreProfesor = prof.Nombre
            }
        }


    }

    res.json({
        ok: true,
        grados
    })
}

const getGrado = async(req, res) => {
    const grado = await Grado.findById(req.params.id);
    res.json({
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
        grado
    })
}

const putGrado = async(req, res) => {
    const id = req.params.id;
    try {
        const grado = await Grado.findById(id);
        if (!grado) {
            return res.status(404).json({
                mensaje: 'Grado no encontrado'
            })
        }

        const gradoActualizado = await Grado.findByIdAndUpdate(id, req.body);
        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error);
    }

}

const delGrado = async(req, res) => {
    const id = req.params.id;
    try {
        const grado = await Grado.findById(id);
        if (!grado) {
            return res.status(404).json({
                mensaje: 'Grado no encontrado'
            })
        }

        const gradoActualizado = await Grado.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Grado borrado',
            res: gradoActualizado
        })
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