
const { response } = require('express');
const Threat = require('../models/Threat');
const logger = require('../helper/logger');

const listarAmenazas = async(req, res = response) => {

    try {

        var request = require('request');
        request({
            url: 'https://api.metadefender.com/v4/feed/infected/latest',
            method: 'GET', 
            headers: { 
                'apiKey': '60bad23bbe4fc59328c4beeacef95c31'
            }
        }, function(error, response, body){
            if(error) {

                logger.error(error);

            } else {

                const threats = JSON.parse(body);

                Promise.all(
                    threats.hashes.map(async (threat) => {

                        const threatExists = await Threat.exists({threat_id: threat.data_id});
                        if (threatExists) {

                            await Threat.findOneAndUpdate({ threat_id: threat.data_id }, {$inc : {'counter' : 1}}, {
                            returnOriginal: false

                            });
 
                        } else {

                            const dbThreat = new Threat({
                                threat_id : threat.data_id,
                                threat_name : threat.threat_name,
                                start_time : threat.start_time,
                                file_type_extension : threat.file_type_extension,
                                counter : 1,
                            });
    
                            await dbThreat.save();

                        }
                    })
                ).then( async () => {
 

                    const amenazas = await Threat.find();

                    logger.info('listarAmenazas - Lista de amenazas actualizada exitosamente');

                    return res.status(201).json({
                        ok: true,
                        amenazas,
                        msg: 'Lista de amenazas actualizada exitosamente'
                    });

                }
     
                )

            }
        });


    } catch (error) {

        logger.error(`listarAmenazas - Por favor hable con el administrador. ${error}`);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const obtenerAmenaza = async(req, res = response) => {

    try {

        const { threat_id } = req.params;

        const threat = await Threat.findOne({threat_id: threat_id});
        
        if (threat) {

            logger.info(`obtenerAmenaza - Amenaza con threat_id:${threat_id} encontrada`);
            
            return res.status(201).json({
                ok: true,
                threat,
                msg: 'Amenaza encontrada.'
            });
        
        } else {

            logger.warn(`obtenerAmenaza - Amenaza con threat_id:${threat_id} no encontrada`);

            return res.status(500).json({
                ok: false,
                msg: `Amenaza con threat_id:${threat_id} no encontrada`
            });

        }


    } catch (error) {

        logger.error(`obtenerAmenaza - Por favor hable con el administrador. ${error}`);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const eliminarAmenaza = async(req, res = response) => {

    try {

        const { threat_id } = req.params;

        const threat = await Threat.findOne({threat_id: threat_id});

        if (threat) {
            Threat.findByIdAndRemove(threat._id, function(err){ 
                if(err){

                    logger.error(`eliminarAmenaza - Error al intentar eliminar amenaza con threat_id:${threat_id}`);

                    return res.status(500).json({
                        ok: false,
                        msg: `Error al intentar eliminar amenaza con threat_id:${threat_id}`
                    });
                }else{

                    logger.info(`eliminarAmenaza - Amenaza con threat_id:${threat_id} eliminada de la base de datos`);

                    return res.status(201).json({
                        ok: true,
                        threat,
                        msg: 'Amenaza eliminada de la base de datos exitosamente.'
                    });
                }
                
            });
        }
        else {

            logger.warn(`eliminarAmenaza - Amenaza con threat_id:${threat_id} no encontrada`);

            return res.status(500).json({
                ok: false,
                msg: `Amenaza con threat_id:${threat_id} no encontrada`
            });

        }
       
        
    } catch (error) {

        logger.error(`eliminarAmenaza - Por favor hable con el administrador. ${error}`);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

module.exports = {
    listarAmenazas,
    obtenerAmenaza,
    eliminarAmenaza
};