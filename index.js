require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Crea el servidor express
const app = express();

// configurar cors
app.use(cors());

// lecutura y parseo del body
app.use(express.json());

// Iniciar db
dbConnection();

// Rutas
app.use("/api/usuarios", require("./routes/usuarios-routes"));
app.use('/api/hospitales', require('./routes/hospitales-routes'));
app.use('/api/medicos', require('./routes/medicos-routes'));
app.use("/api/login", require("./routes/auth"));
app.use("/api/todo", require("./routes/busquedas-routes"));
app.use("/api/upload", require("./routes/uploads-routes"));

app.listen(process.env.PORT, () => {
  console.log("servidor corriendo " + process.env.PORT);
});


// 5fXezKg7Ljuoo0vi
// mean_user
