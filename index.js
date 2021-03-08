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
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("servidor corriendo " + process.env.PORT);
});

// 5fXezKg7Ljuoo0vi
// mean_user
