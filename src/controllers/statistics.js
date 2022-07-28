const ctrl = {};
const Bidding = require('../models/biddingMonitoring');

/*
    /api/statistics/statusDate
*/

//Recibe un Estado y un rango de fechas, devuleve todos los pliegos con ese estado en ese rango de fechas.
// Input: Status, Date range
// Output: Array of Bidding 
ctrl.statusDate = async (req, res) => {
    let status = req.query.status;
    let startDate = req.query.startDate;
    let finishDate = req.query.finishDate;

    try{
        let biddings = await Bidding.find({Status: status, ContractDate: {$gte: startDate, $lte: finishDate}}).exec()
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

//Recibe un rango de fechas y devulve la cantidad de pliegos por cada tipo de licitacion (Publica, Privada, etc)
//Input: Range Date
//Output: Array of group of types ([{_id: Public, total: 2}, {_id: Private, total: 5}, {etc}])
ctrl.biddingType = async (req, res) => {
    let startDate = new Date(req.query.startDate);
    let finishDate = new Date(req.query.finishDate);    

    try{
        let biddings = await Bidding.aggregate([
            {$match:{
                ContractDate:{$lte: finishDate, $gte: startDate}
            }},
            {$group:{
                _id: '$BiddingType', total: {$sum: 1}
            }}
        ]).exec()
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

//Recibe un rango de fechas y devuelve la cantidad de pliegos por cada estado de avance (contratada, finalizada, llamada, etc)
//Input: Date Range
//Output: Array of group of status ([{_id: Contratada, total: 2}, {_id: Finalizada, total: 5}, {etc}])
ctrl.statusCount = async (req, res) => {
    let startDate = new Date(req.query.startDate);
    let finishDate = new Date(req.query.finishDate);

    try{
        // let biddings = await Bidding.find({ContractDate: {$gte: startDate, $lte: finishDate}})
        let biddings = await Bidding.aggregate([
            {$match:{
                CallDate:{$lte: finishDate, $gte: startDate}
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
//Recibe un contratista y un rango de fechas, devuelve la cantidad de licitaciones que gano ese contratista
//Input: Contractor and date range
//Output: Object with quantity of bidding for that contractor. ({bidding: 5})
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

//Recibe un contratista y un rango de fechas, y devuelve todos los pliegos de ese contratista en el rango especificado
//Input: Contractor and Date range
//Output: Array of bidding
ctrl.biddingByContractor = async (req, res) => {
}

//Recibe un rango de presupuesto y un tipo de presupuesto (oficial o monto adjudicado) y devuelve los pliegos que cumplen ese rango
//Input: Budget Range
//Output: Array of bidding
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