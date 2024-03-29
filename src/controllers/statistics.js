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
        // let biddings = await Bidding.find({Active: true, Status: status, CallDate: {$gte: startDate, $lte: finishDate}}).exec()
        let biddings = await Bidding.find({
            Status: status, 
            Active: true, 
            $or:[
            {CallDate:{$lte: finishDate, $gte: startDate}},
            {ContractDate:{$lte: finishDate, $gte: startDate}},
            {BidOpeningDate:{$lte: finishDate, $gte: startDate}},
            {PreAdjudgmentActDate:{$lte: finishDate, $gte: startDate}},
            {ApproveDate:{$lte: finishDate, $gte: startDate}}
            ]
        }).exec()
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

//Recibe un rango de fechas y devulve la cantidad de pliegos por cada tipo de licitacion (Publica, Privada, etc)
//Input: Range Date
//Output: Array of group of types ([{_id: Public, total: 2}, {_id: Private, total: 5}, {etc}])
ctrl.biddingType = async (req, res) => {
    let startDate = new Date(req.query.startDate);
    let finishDate = new Date(req.query.finishDate);    

    try{
        let biddings = await Bidding.aggregate([
            {$match:{
                $or: [
                    {CallDate:{$lte: finishDate, $gte: startDate}},
                    {ContractDate:{$lte: finishDate, $gte: startDate}},
                    {BidOpeningDate:{$lte: finishDate, $gte: startDate}},
                    {PreAdjudgmentActDate:{$lte: finishDate, $gte: startDate}},
                    {ApproveDate:{$lte: finishDate, $gte: startDate}},
                ],
                Active: true
            }},
            {$group:{
                _id: '$BiddingType', total: {$sum: 1}
            }}
        ]).exec()
        console.log(biddings)
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
                $or: [
                    {CallDate:{$lte: finishDate, $gte: startDate}},
                    {ContractDate:{$lte: finishDate, $gte: startDate}},
                    {BidOpeningDate:{$lte: finishDate, $gte: startDate}},
                    {PreAdjudgmentActDate:{$lte: finishDate, $gte: startDate}},
                    {ApproveDate:{$lte: finishDate, $gte: startDate}},
                ],
                Active:true
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
//Recibe un contratista y un rango de fechas, y devuelve todos los pliegos de ese contratista en el rango especificado
//Input: Contractor and Date range
//Output: Array of bidding
ctrl.biddingByContractor = async (req, res) => {
    let startDate = new Date(req.query.startDate);
    let finishDate = new Date(req.query.finishDate);
    let contractor = req.query.contractor
  
    try{
        let ids = await Bidding.aggregate([
            {$unwind: "$BidQuantity"},
            {$match:{
                Active:true,
                ContractDate:{$lte: finishDate, $gte: startDate},
                $and:[
                    {$expr:{$in:[{$toObjectId:contractor},"$BidQuantity.Contractor"]}},
                    {$expr: {$eq:["$BidQuantity.Winner", true]}}   
                ]
            }},
            {$group:{
                _id: "$_id"
            }}
        ]).exec()

        let biddings = await Bidding.find({_id: {$in: ids}}).exec()
        console.log("ids", ids)
        console.log("pliegos", biddings)
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

//Recibe un contratista y un rango de fechas, devuelve la cantidad de licitaciones que gano ese contratista
//Input: Contractor and date range
//Output: Object with quantity of bidding for that contractor. ({bidding: 5})
//FUERA DE USO, NO HACE ESO QUE DICE ARRIBA, SE DEJA PARA FUTURO USO
ctrl.contractor = async (req, res) => {
    let contractor = req.query.contractor;
    let startDate = req.query.startDate;
    let finishDate = req.query.finishDate;

    try{
        let biddings = await Bidding.find({Contractor: contractor, ContractDate: {$gte: startDate, $lte: finishDate}}).exec()
        console.log(biddings)
        if(biddings.length === 0){
            res.status(200).json(biddings)
            return
        }
        res.status(200).json(biddings);
    }
    catch (err) {
        console.log(err); 
    }
}

//Recibe un rango de presupuesto y un tipo de presupuesto (oficial o monto adjudicado) y devuelve los pliegos que cumplen ese rango
//Input: Budget Range
//Output: Array of bidding
ctrl.budget = async (req, res) => {
    //Mongoose dont run the getter when use $gte and $lte ¯\_(ツ)_/¯
    let botBudget = req.query.botBudget * 100;
    let topBudget = req.query.topBudget * 100;
    let startDate = req.query.startDate;
    let finishDate = req.query.finishDate;
    
    let query = {}
    if(req.query.budgetType == 'OfficialBudget'){
        query = {
            Active:true,
            OfficialBudget: {$gte: botBudget, $lte: topBudget},
            CallDate: {$gte: startDate, $lte: finishDate}
        }
    }
    else{
        query = {
            Active:true,
            AllocatedBudget: {$gte: botBudget, $lte: topBudget},
            ContractDate: {$gte: startDate, $lte: finishDate}
        }
    }

    try{
        let biddings = await Bidding.find(query).exec()
        if(biddings.length === 0){
            res.status(200).json(biddings)
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