const Grado = require('../models/profesor')
const { validationResult } = require('express-validator')



const getGrados = async(req, res) => {
    const grados = await Grado.find();
    res.json({
        ok: true,
        grados
    })
}

const postGrado = async(req, res) => {

    // const { Id, Nombre, Apellidos, Genero, Fnacimiento } = req.body
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
    delGrado
}