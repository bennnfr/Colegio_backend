const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//servidor
const app = express();

//cors
app.use(cors());

//base de datos
dbConnection();

//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'ey'
    })
})


app.listen(process.env.PORT, () => {
    console.log('Servidor levantado en el puerto ' + process.env.PORT)
})