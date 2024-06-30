const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const fundacionesSchema = new mongoose.Schema({
    logo: String,
    titulo: String,
    horario: String,
    direccion: String,
    telefono: String,
    sitioWeb: String,
    mapaBoton: String,
    email: {
        type: String,
        unique: true, // Este campo debe ser único
        required: true
    },
    mapa: String,
    descripcion: String,
    tituloEtiquetas: [String],
    //password: {
    //    type: String,
    //    required: true
    //},
},
{
    timestamps: true,
    versionKey: false
});

const fundacionModel = mongoose.model('Fundaciones', fundacionesSchema, "Fundaciones");


router.get("/etiqueta", async (req, res, next) => {
    try {
        const etiqueta = req.query.etiqueta;

        const fundaciones = await fundacionModel.find({
            tituloEtiquetas: { $in: etiqueta }
        });
        res.send({ list: fundaciones });
    } catch (error) {
        next(new Error("Error al obtener las fundaciones por etiqueta: " + error.message));
    }
}
);

router.get("/", async (req, res, next) => {
    try {
        const listAll = await fundacionModel.find({})
        res.send({ list: listAll });
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;