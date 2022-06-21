const Profesor = require('../models/profesor')
const Grados = require('../models/grados')
const { validationResult } = require('express-validator')



const getProfesores = async(req, res) => {
    const profesores = await Profesor.find();
    res.json({
        ok: true,
        profesores
    })
}

const getProfesor = async(req, res) => {
    const id = req.params.id
    if (id.toString().length !== 24) {
        return res.json({
            ok: false,
            msg: 'El id no es valido',
        })
    }
    const profesor = await Profesor.findById(id);
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
        msg: 'Profesor creado exitosamente',
        profesor
    })
}

const putProfesor = async(req, res) => {
    const id = req.params.id;
    try {
        if (id.toString().length !== 24) {
            return res.json({
                ok: false,
                msg: 'El id no es valido',
            })
        }
        const profesor = await Profesor.findById(id);
        if (!profesor) {
            return res.json({
                ok: false,
                msg: 'Profesor no encontrado',
            })
        }

        const profesorActualizado = await Profesor.findByIdAndUpdate(id, req.body);
        res.json({
            ok: true,
            msg: 'Profesor actualizado exitosamente'
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
            return res.json({
                ok: false,
                msg: 'Profesor no encontrado',
            })
        }

        const grad = await Grados.find();
        if (!grad) {
            const profesorActualizado = await Profesor.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: 'Profesor borrado',
                res: profesorActualizado
            })
        } else {
            for (const prop in grad) {
                if (grad[prop].ProfesorId === id) {
                    return res.json({
                        ok: false,
                        msg: 'No se puede borrar el profesor porque pertenece a un grado, elimine el grado primero',
                    })
                }
            }
            const profesorActualizado = await Profesor.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: 'Profesor borrado',
                res: profesorActualizado
            })
        }

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