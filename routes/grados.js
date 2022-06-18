const { Router } = require('express');
const { getGrados, postGrado, putGrado, delGrado } = require('../controllers/grados');
const { check } = require('express-validator')
const router = Router();

router.get('/', getGrados);

router.post('/', [
    check('Nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ProfesorId', 'El ProfesorId son obligatorios').not().isEmpty()
], postGrado);
//ojo
//router.get('/:id', getAlumno);
router.put('/:id', putGrado);
router.delete('/:id', delGrado);

module.exports = router