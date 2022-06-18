const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//servidor
const app = express();

//cors
app.use(cors());

//body
app.use(express.json());

//base de datos
dbConnection();

app.use('/api/alumnos', require('./routes/alumnos'));
app.use('/api/profesores', require('./routes/profesores'));

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Servidor levantado en el puerto ' + PORT)
})