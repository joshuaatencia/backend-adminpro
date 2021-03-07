require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crea el servidor express
const app = express();

// configurar cors
app.use(cors());

// Iniciar db
dbConnection();

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo ' + process.env.PORT);
});

// 5fXezKg7Ljuoo0vi
// mean_user