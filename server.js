const express = require("express");
const app = express();
const cors = require("cors");

// ===============================
// CONFIGURACIÓN
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// MIDDLEWARE LOGS (PRO)
// ===============================
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ===============================
// RUTA BASE
// ===============================
app.get("/", (req, res) => {
    res.json({
        message: "Servidor Atalaya funcionando 🚀",
        status: "OK"
    });
});

// ===============================
// VALIDACIÓN SIMPLE (PRO)
// ===============================
function validateContact(data) {
    const errors = [];

    if (!data.nombre || data.nombre.trim() === "") {
        errors.push("El nombre es obligatorio");
    }

    if (!data.correo || !data.correo.includes("@")) {
        errors.push("El correo no es válido");
    }

    if (!data.mensaje || data.mensaje.trim() === "") {
        errors.push("El mensaje es obligatorio");
    }

    return errors;
}

// ===============================
// ENDPOINT CONTACTO
// ===============================
app.post("/contact", (req, res) => {

    const { nombre, correo, mensaje } = req.body;

    // Validación
    const errors = validateContact(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    // Simulación guardado (puedes luego meter DB)
    const newContact = {
        nombre,
        correo,
        mensaje,
        fecha: new Date()
    };

    console.log("📩 Nuevo mensaje recibido:");
    console.log(newContact);

    return res.status(200).json({
        success: true,
        message: "Mensaje recibido correctamente"
    });
});

// ===============================
// MANEJO DE ERRORES GLOBAL
// ===============================
app.use((err, req, res, next) => {
    console.error("Error:", err);

    res.status(500).json({
        success: false,
        message: "Error interno del servidor"
    });
});

// ===============================
// SERVER
// ===============================
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});