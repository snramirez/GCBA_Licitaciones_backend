const jwt = require('jsonwebtoken');
const secretKey = 'LaPuercaEstaEnLaPosilga';

const isLogIn = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err){
            return res.status(401).json({title: 'Error token'})
        }

        req.user = decoded.userDB;
        next();
    })
};

const roleCheck = (req, res, next) => {
    let role = req.user.Role;
     
    if(role !== 'ADMIN'){
        res.status(401).json({title: 'Usuario no autorizado'})
        return
    }
    
    next();
}

module.exports = {isLogIn, roleCheck}