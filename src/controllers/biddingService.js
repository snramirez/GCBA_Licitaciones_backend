const ctrl = {};
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const Bidding = require('../models/biddingService');

ctrl.index = async (req, res) => {
    try{
        // let biddings = await Bidding.find().populate({
        //     path: 'BidQuantity',
        //     populate: {
        //         path: 'Contractor',
        //         model: 'contractor'
        //     }
        // }).exec()
        let biddings = await Bidding.find({Active: true}).exec()
        if(biddings.length === 0){
            res.status(200).json([{Error: 'No hay licitaciones'}])
           
            return
        }
        res.status(200).json(biddings);
    }
    catch (err) {
        console.log(err);
    }

};

ctrl.create = async (req, res) => {
    let reqBidding = req.body.bidding;
    console.log(req.body);
    reqBidding.Contractor == "" ?  delete reqBidding.Contractor : 0 
    console.log('despues delete', req.body);
    try {
        savedBid = await new Bidding(req.body.bidding).save();
        res.status(200).json(savedBid);
    } 
    catch (err) {
        console.log(err)
        res.status(400).json({Error: 'Error al crear pliego'})
    }

};

ctrl.edit = async (req, res) => {
    console.log(req.body)
    try {
        let savedBidding = await Bidding.findByIdAndUpdate(req.body.id, req.body.data, {new: true}).exec()
        res.status(200).json(savedBidding)
    } 
    catch (error) {
        console.log(error)    
        res.status(400).json({msj: 'Error al editar el pliego'})
    }
},

ctrl.delete = async (req, res) => {
    console.log(req.body)
    try {
        let savedBidding = await Bidding.findByIdAndUpdate(req.body.id, {Active: false}, {new: true}).exec()
        res.status(200).json(savedBidding)
    } 
    catch (error) {
        console.log(error)    
        res.status(400).json({msj: 'Error al borrar el pliego'})
    }
}

ctrl.addMany = async (req, res) => {
    manyBidding = req.body.biddings
    console.log(manyBidding)

    manyBidding.forEach(async element => {
        try {
            await new Bidding(element).save()
        } 
        catch (error) {
            console.log(error)
        }
    });

    res.status(200).json({Msj: 'todo salio bien'})
}

module.exports = ctrl;

