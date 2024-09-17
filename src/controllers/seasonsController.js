const admin = require("../db-firebase");


// Agregar una nueva Season a una serie
exports.addSeason = async (req, res) => {
    const { serieId } = req.params;
    const { nombre, imagen } = req.body;

    try {
        const SeasonId = uuidv4(); // Generar un ID único para la Season
        const db = admin.database();
        await db.ref(`series/${serieId}/seasons/${SeasonId}`).set({
            nombre,
            imagen,
        });

        res.status(201).json({ message: 'Season agregada correctamente', id: SeasonId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todas las Seasons de una serie
exports.listSeasons = async (req, res) => {
    const { serieId } = req.params;

    try {
        const db = admin.database();
        const snapshot = await db.ref(`series/${serieId}/seasons`).once('value');
        const seasons = snapshot.val();
        if (!seasons) {
            return res.status(200).json([]); // Retornar un array vacío si no hay seasons
        }
        
        const seasonsArray = Object.keys(seasons).map(key => ({ id: key, ...seasons[key] }));

        res.status(200).json(Seasons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modificar una Season existente
exports.updateSeason = async (req, res) => {
    const { serieId, seasonId } = req.params;
    const { nombre, imagen } = req.body;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}/seasons/${SeasonId}`).update({
            nombre,
            imagen,
        });

        res.status(200).json({ message: 'Season modificada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una Season de una serie
exports.deleteSeason = async (req, res) => {
    const { serieId, SeasonId } = req.params;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}/Seasons/${SeasonId}`).remove();

        res.status(200).json({ message: 'Season eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};