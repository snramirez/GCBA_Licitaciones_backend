const fs = require('fs');
const path = require('path');

const ctrl = {};

ctrl.getType = (req, res) => {  
    console.log('typeservice')
    try {
        let types = fs.readFileSync(path.join(__dirname,'..','data','biddingServiceTypes.txt'), 'utf8')
        .toString().split("\r\n");
        console.log(types)
        res.status(200).json(types.filter(type => type !== ''))
    } 
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
    
};


ctrl.saveType = (req, res) => {

    try {
        fs.appendFileSync(path.join(__dirname,'..','data','biddingServiceTypes.txt'),  req.query.data + '\r\n' );
        res.status(200).json()
    }
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
};

ctrl.deleteType = (req, res) => {
    try {
        let types = fs.readFileSync(path.join(__dirname,'..','data','biddingServiceTypes.txt'), 'utf8').toString().split("\r\n")
        let newTypes = types.filter(type => (type !== req.query.data && type !== ''));
        let typesFIlter = '';
        newTypes.forEach(type => {
            typesFIlter = typesFIlter.concat(type + "\r\n")
        });
        fs.writeFileSync(path.join(__dirname,'..','data','biddingServiceTypes.txt'), typesFIlter);
        res.status(200).json()
    } 
    catch (error) {
        console.log(error)    
        res.status(200).json({msj: 'error al leer el archivo'})

    }
};

ctrl.getStatus = (req, res) => {  
    try {
        let status = fs.readFileSync(path.join(__dirname,'..','data','biddingServiceStatus.txt'), 'utf8')
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
        fs.appendFileSync(path.join(__dirname,'..','data','biddingServiceStatus.txt'),  req.query.data + '\r\n' );
        res.status(200).json()
    }
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
};

ctrl.deleteStatus = (req, res) => {
    try {
        let status = fs.readFileSync(path.join(__dirname,'..','data','biddingServiceStatus.txt'), 'utf8').toString().split("\r\n")
        let newStatus = status.filter(elemnent => (elemnent !== req.query.data && elemnent !== ''));
        let statusFIltered = '';
        newStatus.forEach(elemnent => {
            statusFIltered = statusFIltered.concat(elemnent + "\r\n")
        });
        fs.writeFileSync(path.join(__dirname,'..','data','biddingServiceStatus.txt'), statusFIltered);
        res.status(200).json()
    } 
    catch (error) {
        console.log(error)    
        res.status(200).json({msj: 'error al leer el archivo'})

    }
};

ctrl.getDirectContractType = (req, res) => {  
    try {
        let types = fs.readFileSync(path.join(__dirname,'..','data','directContractType.txt'), 'utf8')
        .toString().split("\r\n");
        res.status(200).json(types.filter(type => type !== ''))
    } 
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
    
};


ctrl.saveDirectContractType = (req, res) => {

    try {
        fs.appendFileSync(path.join(__dirname,'..','data','directContractType.txt'),  req.query.data + '\r\n' );
        res.status(200).json()
    }
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
};

ctrl.deleteDirectContractType = (req, res) => {
    try {
        let types = fs.readFileSync(path.join(__dirname,'..','data','directContractType.txt'), 'utf8').toString().split("\r\n")
        let newTypes = types.filter(type => (type !== req.query.data && type !== ''));
        let typesFIlter = '';
        newTypes.forEach(type => {
            typesFIlter = typesFIlter.concat(type + "\r\n")
        });
        fs.writeFileSync(path.join(__dirname,'..','data','directContractType.txt'), typesFIlter);
        res.status(200).json()
    } 
    catch (error) {
        console.log(error)    
        res.status(200).json({msj: 'error al leer el archivo'})

    }
};

ctrl.getHoliday = (req, res) => {  
    try {
        let types = fs.readFileSync(path.join(__dirname,'..','data','holidaysService.txt'), 'utf8')
        .toString().split("\r\n");
        res.status(200).json(types.filter(type => type !== ''))
    } 
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
    
};


ctrl.saveHoliday = (req, res) => {

    try {
        fs.appendFileSync(path.join(__dirname,'..','data','holidaysService.txt'),  req.query.data + '\r\n' );
        res.status(200).json()
    }
    catch (error) {
        console.log(error)
        res.status(200).json({msj: 'error al leer el archivo'})
    }
};

ctrl.deleteHoliday = (req, res) => {
    try {
        let types = fs.readFileSync(path.join(__dirname,'..','data','holidaysService.txt'), 'utf8').toString().split("\r\n")
        let newTypes = types.filter(type => (type !== req.query.data && type !== ''));
        let typesFIlter = '';
        newTypes.forEach(type => {
            typesFIlter = typesFIlter.concat(type + "\r\n")
        });
        fs.writeFileSync(path.join(__dirname,'..','data','holidaysService.txt'), typesFIlter);
        res.status(200).json()
    } 
    catch (error) {
        console.log(error)    
        res.status(200).json({msj: 'error al leer el archivo'})

    }
};

module.exports = ctrl;
