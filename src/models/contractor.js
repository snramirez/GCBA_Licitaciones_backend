const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractorSchema = new Schema({
    Name: {type: String},
    Cuit: {type: String}
},
{timestamps:true})

const contractor = mongoose.model('contractor', contractorSchema);
module.exports = contractor;