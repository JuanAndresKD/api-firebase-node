const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');
const seasonsController = require('../controllers/seasonsController');
const episodesController = require('../controllers/episodesControllers');

const {verificarToken} = require('../middleware/authToken')

// Rutas para manejar las series
router.post('/add', verificarToken, seriesController.addSerie);
router.get('/list', verificarToken, seriesController.listSeries);
router.put('/update/:serieId', verificarToken, seriesController.updateSerie);
router.delete('/delete/:serieId', verificarToken, seriesController.deleteSerie);

// Rutas para manejar las seasons dentro de una serie
router.post('/:serieId/seasons', verificarToken, seasonsController.addSeason);
router.get('/:serieId/seasons', verificarToken, seasonsController.listSeasons);
router.put('/:serieId/seasons/:seasonId', verificarToken, seasonsController.updateSeason);
router.delete('/:serieId/seasons/:seasonId', verificarToken, seasonsController.deleteSeason);

// Rutas para manejar los episodes dentro de una season
router.post('/:serieId/seasons/:seasonId/episode', verificarToken, episodesController.addEpisode);
router.get('/:serieId/seasons/:seasonId/episodes', verificarToken, episodesController.listEpisodes); 
router.put('/:serieId/seasons/:seasonId/episode/:episodeId', verificarToken, episodesController.updateEpisode);
router.delete('/:serieId/seasons/:seasonId/episode/:episodeId', verificarToken, episodesController.deleteEpisode);

module.exports = router;
