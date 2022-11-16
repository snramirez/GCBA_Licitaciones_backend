const ctrl = {};
const User = require('../models/user');
const jwt =  require('jsonwebtoken');
const bcrypt = require('../helpers/bcrypt');
const secretKey = 'LaPuercaEstaEnLaPosilga';

ctrl.login = async (req, res) => {
    console.log(req.body);
    const userName = req.body.UserName;
    const password = req.body.Password;
    
    try {
        let userDB = await User.findOne({UserName: userName}).lean();
        if(!userDB){
            res.json({error: 'USER_NOT_FOUND'})
            return
        }

        if(!await bcrypt.matchPassword(password, userDB.Password)){
            res.json({error: 'INVALID_PASSWORD'})
            return
        }

        const token = jwt.sign(userDB, secretKey);
        userDB.Token = token
        res.status(200).json(userDB);
    } 
    catch (err) {
        console.log(err)
        res.json({error: 'DATABASE_ERROR'})
    }
};

ctrl.register = async (req, res) => {
    console.log(req.body)
    let reqUser = req.body;    
    let encryptPassword = await bcrypt.encryptPassword(reqUser.Password);

    if(!(reqUser.SecretKey === 'secretkey')){
        res.status(400).json({title: 'Clave secreta incorrecta'})
        return
    }

    let user = new User({
        UserName: reqUser.UserName,
        Password: encryptPassword,
        Cuit: reqUser.Cuit,
        FullName: reqUser.FullName,
    });

    try {
        let savedUser = await user.save()
        res.status(200).json(savedUser);
    } 
    catch (err) {
        console.log(err);
        res.status(400).json({Title: 'Error al registar usuario'});
    }
};

module.exports = ctrl;