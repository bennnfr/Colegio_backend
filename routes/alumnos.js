const { Router } = require('express');
const { getAlumnos, postAlumno, putAlumno, delAlumno, getAlumno } = require('../controllers/alumnos');
const { check } = require('express-validator')
const router = Router();

router.get('/', getAlumnos);

router.post('/', [
    check('Nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('Apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('Genero', 'El genero es obligatorio').not().isEmpty(),
    check('Fnacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
], postAlumno);
//ojo
router.get('/:id', getAlumno);
router.put('/:id', putAlumno);
router.delete('/:id', delAlumno);

module.exports = router