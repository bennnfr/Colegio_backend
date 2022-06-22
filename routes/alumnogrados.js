const { Router } = require('express');
const { getAlumnosGrados, postAlumnoGrado, putAlumnoGrado, delAlumnoGrado, getAlumnoGrado } = require('../controllers/alumnogrados');
const { check } = require('express-validator')
const router = Router();

router.get('/', getAlumnosGrados);

router.post('/', [

], postAlumnoGrado);

router.get('/:id', getAlumnoGrado);
router.put('/:id', putAlumnoGrado);
router.delete('/:id', delAlumnoGrado);
//
module.exports = router