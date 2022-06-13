const ctrl = {};
const Bidding = require('../models/biddingMonitoring');

/*
    /api/statistics/statusDate
*/

ctrl.statusDate = async (req, res) => {
    let status = req.query.status;
    let startDate = req.query.startDate;
    let finishDate = req.query.finishDate;

    try{
        let biddings = await Bidding.find({Status: status, ContractDate: {$gte: startDate, $lte: finishDate}}).exec()
        console.log("🚀 ~ file: statistics.js ~ line 11 ~ ctrl.statusDate= ~ biddings", biddings)
        if(biddings.length === 0){
            res.status(200).json({Error: 'No hay licitaciones'})
            return
        }
        res.status(200).json(biddings);
    }
    catch (err) {
        console.log(err); 
    }

};

ctrl.biddingType = async (req, res) => {
    let startDate = new Date(req.query.startDate);
    let finishDate = new Date(req.query.finishDate);

    try{
        // let biddings = await Bidding.find({ContractDate: {$gte: startDate, $lte: finishDate}})
        let biddings = await Bidding.aggregate([
            {$match:{
                ContractDate:{$lte: finishDate, $gte: startDate}
            }},
            {$group:{
                _id: '$BiddingType', total: {$sum: 1}
            }}
        ]).exec()
        console.log("🚀 ~ file: statistics.js ~ line 11 ~ ctrl.statusDate= ~ biddings", biddings)
        if(biddings.length === 0){
            res.status(200).json({Error: 'No hay licitaciones'})
            return
        }
        res.status(200).json(biddings);
    }
    catch (err) {
        console.log(err); 
    }
};

ctrl.statusCount = async (req, res) => {
    let startDate = new Date(req.query.startDate);
    let finishDate = new Date(req.query.finishDate);

    try{
        // let biddings = await Bidding.find({ContractDate: {$gte: startDate, $lte: finishDate}})
        let biddings = await Bidding.aggregate([
            {$match:{
                ContractDate:{$lte: finishDate, $gte: startDate}
            }},
            {$group:{
                _id: '$Status', total: {$sum: 1}
            }}
        ]).exec()
        console.log("🚀 ~ file: statistics.js ~ line 11 ~ ctrl.statusDate= ~ biddings", biddings)
        if(biddings.length === 0){
            res.status(200).json({Error: 'No hay licitaciones'})
            return
        }
        res.status(200).json(biddings);
    }
    catch (err) {
        console.log(err); 
    }
};

ctrl.contractor = async (req, res) => {
    let startDate = new Date(req.query.startDate);
    let finishDate = new Date(req.query.finishDate);
    let contractor = req.query.contractor;

    try{
        // let biddings = await Bidding.find({ContractDate: {$gte: startDate, $lte: finishDate}})
        let biddings = await Bidding.aggregate([
            {$match:{
                ContractDate:{$lte: finishDate, $gte: startDate},
                Contractor:contractor
            }},
            {$count:"Bidding"}
        ]).exec()
        console.log("🚀 ~ file: statistics.js ~ line 11 ~ ctrl.statusDate= ~ biddings", biddings)
        if(biddings.length === 0){
            res.status(200).json({Error: 'No hay licitaciones'})
            return
        }
        res.status(200).json(biddings);
    }
    catch (err) {
        console.log(err); 
    }
};

ctrl.budget = async (req, res) => {
    let botBudget = req.query.botBudget;
    let topBudget = req.query.topBudget;
    let query = {}
    if(req.query.budgetType == 'OfficialBudget'){
        query = {
            OfficialBudget: {$gte: botBudget, $lte: topBudget}
        }
    }
    else{
        query = {
            AllocatedBudget: {$gte: botBudget, $lte: topBudget}
        }
    }

    try{
        let biddings = await Bidding.find({OfficialBudget: {$gte: botBudget, $lte: topBudget}}).exec()
        console.log("🚀 ~ file: statistics.js ~ line 11 ~ ctrl.statusDate= ~ biddings", biddings)
        if(biddings.length === 0){
            res.status(200).json({Error: 'No hay licitaciones'})
            return
        }
        res.status(200).json(biddings);
    }
    catch (err) {
        console.log(err); 
    }
};

ctrl.create = async (req, res) => {


};

module.exports = ctrl;