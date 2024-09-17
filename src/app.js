const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const moviesRoutes = require('./routes/moviesRoutes'); // Importar las rutas de películas
const seriesRoutes = require('./routes/seriesRoutes'); // Importar las rutas de películas


const app = express();

// Configura el middleware para analizar JSON
app.use(bodyParser.json());
app.use(cors());

// Usa las rutas definidas
app.use('/api/users', userRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/series', seriesRoutes);


app.get('/', function (req, res) {
    res.send('Hello World')
  })
module.exports = app;
