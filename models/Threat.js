const { Schema, model } = require("mongoose");


const ThreatSchema = Schema({
    threat_id: {
        type: String,
        require: true,
        unique: true
    },
    threat_name: {
        type: String,
        require: true,
    },
    start_time: {
        type: Date,
        require: true
    },
    file_type_extension: {
        type: String,
        require: true
    },
    counter: {
        type: Number,
        require: true
    },
});

module.exports = model('Threat', ThreatSchema);