const admin = require("../db-firebase");
const { v4: uuidv4 } = require('uuid');

// Agregar una nueva serie
exports.addSerie = async (req, res) => {
    const { nombre, descripcion, imagen } = req.body;

    try {
        const serieId = uuidv4(); // Generar un ID único para la serie
        const db = admin.database();
        await db.ref('series/' + serieId).set({
            nombre,
            descripcion,
            imagen,
        });

        res.status(201).json({ message: 'Serie agregada correctamente', id: serieId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





// Listar todas las series
exports.listSeries = async (req, res) => {
    try {
        const db = admin.database();
        const snapshot = await db.ref('series').once('value');
        const series = snapshot.val();

        res.status(200).json(series);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modificar una serie existente
exports.updateSerie = async (req, res) => {
    const { serieId } = req.params;
    const { nombre, descripcion, imagen } = req.body;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}`).update({
            nombre,
            descripcion,
            imagen,
        });

        res.status(200).json({ message: 'Serie modificada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Eliminar una serie completa
exports.deleteSerie = async (req, res) => {
    const { serieId } = req.params;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}`).remove();

        res.status(200).json({ message: 'Serie eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




