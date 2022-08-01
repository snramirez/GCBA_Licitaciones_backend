const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const biddingMonitoringSchema = new Schema({
    BiddingNumber: {type: String},
    Record: {type: String},
    RecordBAC: {type: String},
    Bidding: {type: String},
    Responsable: {type: String},
    Division: {type: String},
    BiddingType: {type: String},        
    OfficialBudget: {type: Schema.Types.Decimal128},
    Status: {type: String},
    EntryDocumentReview: {type: Date},
    ExitDocumentReview: {type: Date},
    FirstPG: {type: Date},
    FirstLapPG: {type: Date},
    CallDate: {type: Date},
    BidOpeningDate: {type: Date},
    BidQuantity: {type: String},
    PreAdjudgmentActDate: {type: Date},
    PreAdjudgmentActNumber: {type: String},
    SecondPG: {type: Date},
    SecondLapPG: {type: Date},
    DayQuantity: {type: String},
    ApproveNumber: {type: String},
    ApproveDate: {type: Date},
    AllocatedBudget : {type: Schema.Types.Decimal128},
    SPO: {type: String},
    Contractor: {type: String},
    ContractDate: {type: Date},
    ProcedureDays: {type: String},
    Observations: {type: String},
},
{timestamps: true});

const biddingMonitoring = mongoose.model('biddingMonitoring', biddingMonitoringSchema);
module.exports = biddingMonitoring;