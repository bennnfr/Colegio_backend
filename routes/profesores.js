const { Router } = require('express');
const { getProfesores, postProfesor, putProfesor, delProfesor, getProfesor } = require('../controllers/profesores');
const { check } = require('express-validator')
const router = Router();

router.get('/', getProfesores);

router.post('/', [
    check('Nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('Apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('Genero', 'El genero es obligatorio').not().isEmpty(),
], postProfesor);
//ojo
router.get('/:id', getProfesor);
router.put('/:id', putProfesor);
router.delete('/:id', delProfesor);
//
module.exports = router