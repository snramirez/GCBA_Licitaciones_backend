const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractorSchema = new Schema({
    Name: {type: String},
    Cuit: {type: String, unique: true},
    Type: {type: String, enum:['OBRAS', 'SERVICIOS']},
    Active:{type: Boolean, default: true}
},
{timestamps:true})

const contractor = mongoose.model('contractor', contractorSchema);
module.exports = contractor;