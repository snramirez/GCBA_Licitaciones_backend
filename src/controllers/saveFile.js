const fs = require('fs');
const path = require('path');

const ctrl = {};

ctrl.getType = (req, res) => {  
    try {
        let types = fs.readFileSync(path.join(__dirname,'..','data','biddingtypes.txt'), 'utf8')
        .toString().split("\r\n");
        res.status(200).json(types.filter(type => type !== ''))
    } 
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
    
};


ctrl.saveType = (req, res) => {

    try {
        fs.appendFileSync(path.join(__dirname,'..','data','biddingtypes.txt'),  req.query.type + '\r\n' );
        res.status(200).json()
    }
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
};

ctrl.deleteType = (req, res) => {
    try {
        let types = fs.readFileSync(path.join(__dirname,'..','data','biddingtypes.txt'), 'utf8').toString().split("\r\n")
        let newTypes = types.filter(type => (type !== req.query.type && type !== ''));
        let typesFIlter = '';
        newTypes.forEach(type => {
            typesFIlter = typesFIlter.concat(type + "\r\n")
        });
        fs.writeFileSync(path.join(__dirname,'..','data','biddingtypes.txt'), typesFIlter);
        res.status(200).json()
    } 
    catch (error) {
        console.log(error)    
        res.status(200).json({msj: 'error al leer el archivo'})

    }
};

ctrl.getStatus = (req, res) => {  
    try {
        let status = fs.readFileSync(path.join(__dirname,'..','data','biddingStatus.txt'), 'utf8')
        .toString().split("\r\n");
        res.status(200).json(status.filter(elemnent => elemnent !== ''))
    } 
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
    
};


ctrl.saveStatus = (req, res) => {

    try {
        fs.appendFileSync(path.join(__dirname,'..','data','biddingStatus.txt'),  req.query.status + '\r\n' );
        res.status(200).json()
    }
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
};

ctrl.deleteStatus = (req, res) => {
    try {
        let status = fs.readFileSync(path.join(__dirname,'..','data','biddingStatus.txt'), 'utf8').toString().split("\r\n")
        let newStatus = status.filter(elemnent => (elemnent !== req.query.status && elemnent !== ''));
        let statusFIltered = '';
        newStatus.forEach(elemnent => {
            statusFIltered = statusFIltered.concat(elemnent + "\r\n")
        });
        fs.writeFileSync(path.join(__dirname,'..','data','biddingStatus.txt'), statusFIltered);
        res.status(200).json()
    } 
    catch (error) {
        console.log(error)    
        res.status(200).json({msj: 'error al leer el archivo'})

    }
};

module.exports = ctrl;