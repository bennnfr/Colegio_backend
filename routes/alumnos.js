const { Router } = require('express');
const { getAlumnos, postAlumno } = require('../controllers/alumnos')
const router = Router();

router.get('/', getAlumnos)
router.post('/', postAlumno)


module.exports = router