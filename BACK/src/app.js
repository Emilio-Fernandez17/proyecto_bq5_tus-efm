const express = require("express");
const cors = require("cors");
const cochesRoutes = require("./routes/coches.routes");

const app = express();

// Servir imágenes estáticas
app.use("/img", express.static("public/img"));

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de health check
app.get("/api/health", (req, res) => {
    res.json({ ok: true, mensaje: "API de coches funcionando correctamente" });
});

// Rutas de coches
app.use("/api/coches", cochesRoutes);

module.exports = app;