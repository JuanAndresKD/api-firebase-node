const admin = require("../db-firebase");


// Agregar un nuevo capítulo a una temporada
exports.addEpisode = async (req, res) => {
    const { serieId, temporadaId } = req.params;
    const { nombre, numero, url } = req.body;

    try {
        const episodeId = uuidv4(); // Generar un ID único para el capítulo
        const db = admin.database();
        await db.ref(`series/${serieId}/temporadas/${temporadaId}/episodes/${episodeId}`).set({
            nombre,
            numero,
            url,
        });

        res.status(201).json({ message: 'Capítulo agregado correctamente', id: episodeId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todos los capítulos de una temporada específica
exports.listEpisodes = async (req, res) => {
    const { serieId, temporadaId } = req.params;

    try {
        const db = admin.database();
        const snapshot = await db.ref(`series/${serieId}/temporadas/${temporadaId}/episodes`).once('value');
        const episodes = snapshot.val();

        res.status(200).json(episodes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modificar un capítulo existente
exports.updateEpisode = async (req, res) => {
    const { serieId, temporadaId, episodeId } = req.params;
    const { nombre, numero, url } = req.body;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}/temporadas/${temporadaId}/episodes/${episodeId}`).update({
            nombre,
            numero,
            url,
        });

        res.status(200).json({ message: 'Capítulo modificado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un capítulo de una temporada
exports.deleteEpisode = async (req, res) => {
    const { serieId, temporadaId, episodeId } = req.params;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}/temporadas/${temporadaId}/episodes/${episodeId}`).remove();

        res.status(200).json({ message: 'Capítulo eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};