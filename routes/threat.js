const { Router } = require('express');
const { listarAmenazas, obtenerAmenaza, eliminarAmenaza } = require('../controllers/threat');


const router = Router();

// Lista las amenazas
router.get( '/list', listarAmenazas );

// Retorna amenaza por id
router.get( '/:threat_id', obtenerAmenaza );

// Eliminar amenaza por id
router.delete( '/delete/:threat_id' ,eliminarAmenaza );


module.exports = router;