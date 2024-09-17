const {Router} = require('express');
const router = Router();
const userController = require('../controllers/userControllers'); // Asegúrate de ajustar la ruta según tu estructura de proyecto
const {verificarToken} = require('../middleware/authToken')

// Ruta para agregar un nuevo usuario
router.post('/signup', userController.signUpUsers);

// Ruta para login un nuevo usuario
router.post('/signin', userController.signInUsers);

// Ruta para listar todos los usuarios
router.get('/listar', verificarToken, userController.listUsers);

// Ruta para listar un usuario específico por ID
router.get('/listarById/:id', verificarToken, userController.listUsersById);

// Ruta para actualizar un usuario específico por ID
router.put('/actualizar/:id', verificarToken, userController.updateUsers);

// Ruta para eliminar un usuario específico por ID
//router.delete('/eliminar/:id', verificarToken, userController.deleteUsers);

module.exports = router;
