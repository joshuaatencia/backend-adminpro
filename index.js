require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
const path = require("path");

// Crea el servidor express
const app = express();

// configurar cors
app.use(cors());

// lecutura y parseo del body
app.use(express.json());

// Iniciar db
dbConnection();

//directorio publico
app.use(express.static("public"));

// Rutas
app.use("/api/usuarios", require("./routes/usuarios-routes"));
app.use("/api/hospitales", require("./routes/hospitales-routes"));
app.use("/api/medicos", require("./routes/medicos-routes"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/todo", require("./routes/busquedas-routes"));
app.use("/api/upload", require("./routes/uploads-routes"));

//lo ultimo
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("servidor corriendo " + process.env.PORT);
});

// 5fXezKg7Ljuoo0vi
// mean_user
