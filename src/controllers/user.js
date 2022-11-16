const ctrl = {};
const User = require('../models/technician');
const bcrypt = require('../helpers/bcrypt');

ctrl.index = async (req, res) => {

    try {
        let user = await User.find().exec();
        if(user.length == 0){
            res.status(400).json({title: 'La busqueda resulto vacia'})
            return
        } 
        res.status(200).json(user);
    } 
    catch (err) {
        console.log(err);
        res.status(400).json({title: 'Error al buscar en base de datos'});
    }
};

ctrl.create = async (req, res) => {
    console.log(req.body);
    let reqUser = req.body.User;
    let encryptPassword = await bcrypt.encryptPassword(reqUser.Password);
    
    let user = new User({
        UserName: reqUser.UserName,
        Password: encryptPassword,
        Cuit: reqUser.Cuit,
        FullName: reqUser.FullName,
    });

    try {
        let savedUser = await user.save();
        res.status(200).json(savedUser);
    } 
    catch (err) {
        console.log(err);
        res.status(400).json({Title: 'Error al crear usuario en la base de datos'});
    }
}

ctrl.changeRole = async (req, res) => {
    let role= req.query.role;
    let userId = req.query.id;

    try {
        let updatedUser = await User.findByIdAndUpdate(userId, {Role: role}, {new: true})
        res.status(200).json({title: 'Usuario actualizado correctamente', updatedUser})
    } 
    catch (err) {
        console.log(err)
        res.status(400).json({title: 'Error al cambiar el rol', err})
    }
}

module.exports = ctrl;