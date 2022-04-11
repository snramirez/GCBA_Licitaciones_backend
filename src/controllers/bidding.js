const ctrl = {};
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const Bidding = require('../models/biddingMonitoring');

ctrl.index = async (req, res) => {
    try{
        let biddings = await Bidding.find().exec()
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
    let reqBidding = req.body.bidding;
    console.log("🚀 ~ file: bidding.js ~ line 22 ~ ctrl.create= ~ reqBidding", reqBidding)
    
    
    let bid = new Bidding({
        BiddingNumber: reqBidding.BiddingNumber,
        Record: reqBidding.Record,
        RecordBAC: reqBidding.RecordBAC,
        Bidding: reqBidding.Bidding,
        Responsable: reqBidding.Responsable,
        Division: reqBidding.Division,
        BiddingType: reqBidding.BiddingType,        
        OfficialBudget: reqBidding.OfficialBudget,
        Status: reqBidding.Status,
        EntryDocumentReview: reqBidding.EntryDocumentReview,
        ExitDocumentReview: reqBidding.ExitDocumentReview,
        FirstPG: reqBidding.FirstPG,
        FirstLapPG: reqBidding.FirstLapPG,
        CallDate: reqBidding.CallDate,
        BidOpeningDate: reqBidding.BidOpeningDate,
        BidQuantity: reqBidding.BidQuantity,
        PreAdjudgmentActDate: reqBidding.PreAdjudgmentActDate,
        PreAdjudgmentActNumber: reqBidding.PreAdjudgmentActNumber,
        SecondPG: reqBidding.SecondPG,
        SecondLapPG: reqBidding.SecondLapPG,
        DayQuantity: reqBidding.DayQuantity,
        ApproveNumber: reqBidding.ApproveNumber,
        ApproveDate: reqBidding.ApproveDate,
        AllocatedBudget : reqBidding.AllocatedBudget,
        SPO: reqBidding.SPO,
        Contractor: reqBidding.Contractor,
        ContractDate: reqBidding.ContractDate,
        ProcedureDays: reqBidding.ProcedureDays,
        Observations: reqBidding.Observations,
    });

    try {
        savedBid = await bid.save();
        res.status(200).json(savedBid);
    } 
    catch (err) {
        console.log(err)
        res.status(400).json({Error: 'Error al crear pliego'})
    }

};

module.exports = ctrl;