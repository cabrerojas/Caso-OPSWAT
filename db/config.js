const mongoose = require("mongoose");
const logger = require('../helper/logger');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        logger.info('Base de datos Online')

        
    } catch (error) {

        logger.error(error);

        throw new Error('Error a la hora de inicializar la Base de datos');
        
    } 

};

module.exports = {
    dbConnection
};
