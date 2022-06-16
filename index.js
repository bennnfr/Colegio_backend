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


app.listen(process.env.PORT, () => {
    console.log('Servidor levantado en el puerto ' + process.env.PORT)
})