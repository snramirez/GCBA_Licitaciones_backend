const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserName: {type: String, required: true},
    Password: {type: String, required: true},
    Cuit: {type: String, required: true},
    FullName: {type: String, required: true},
    Role: {type: String, enum:['ADMIN', 'TECHNICIAN', 'USER']}
},
{timestamps: true});

const user = mongoose.model('userSchema', userSchema);
module.exports = user;