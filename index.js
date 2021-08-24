const express = require('express');
const cors = require('cors');
const logger = require('./helper/logger');

const { dbConnection } = require('./db/config');
require('dotenv').config();

// Crear el servidor/aplicación de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use( cors() );

// Rutas
app.use( '/api/threat', require('./routes/threat') );

// logger.error('error');
// logger.warn('warn');
// logger.info('info');
// logger.verbose('verbose');
// logger.debug('debug');
// logger.silly('silly');

app.listen( process.env.PORT, () => {
    logger.info(`Servidor corriendo en puerto ${ process.env.PORT } `);
});

