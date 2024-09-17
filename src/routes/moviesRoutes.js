const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const {verificarToken} = require('../middleware/authToken')

// Ruta para agregar una nueva película
router.post('/add', moviesController.agregarPelicula);

// Ruta para listar todas las películas
router.get('/list',  moviesController.listarPeliculas);

// Ruta para modificar una película existente
router.put('/update/:id', verificarToken, moviesController.modificarPelicula);

// Ruta para eliminar una película
router.delete('/delete/:id', verificarToken, moviesController.eliminarPelicula);

module.exports = router;
