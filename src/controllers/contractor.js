const ctrl = {}
const Contractor = require('../models/contractor');


ctrl.index = async (req, res) => {
    try {
        let contractor = await Contractor.find({Active: true});
        if(contractor.length === 0){
            res.status(200).json({msj: 'lista de contractor vacia'})
            return
        }
        res.status(200).json(contractor);
    } catch (error) {
        console.log(error);
        res.status(400).json({msj: 'error al buscar contratistas'})
    }
};

ctrl.create = async (req, res) => {
    try {
        let savedContractor = await new Contractor(req.body.contractor).save();
        res.status(200).json(savedContractor)
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({msj: 'error al guardar contratista'})    
    }
};

ctrl.edit = async (req, res) => {
    console.log(req.body)
    try {
        let savedContractor = await Contractor.findByIdAndUpdate(req.body.id, req.body.data, {new: true}).exec()    
        res.status(200).json(savedContractor)
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({msj: 'error al editar contratista'}) 
    }
};

ctrl.delete = async (req, res) => {
    try {
        let savedContractor = await Contractor.findByIdAndUpdate(req.body.id, {Active: false}, {new: true}).exec()    
        res.status(200).json(savedContractor)
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({msj: 'error al eliminar contratista'}) 
    }
};



module.exports = ctrl
