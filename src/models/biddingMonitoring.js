const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidQuantitySchema = new Schema({
    Contractor: {type: Schema.Types.ObjectId, ref: 'contractor'},
    Quantity: {type: Number, get: getPrice, set: setPrice, default: 0}
});

const biddingMonitoringSchema = new Schema({
    BiddingNumber: {type: String},
    Record: {type: String},
    RecordBAC: {type: String},
    Bidding: {type: String},
    Responsable: {type: String},
    Division: {type: String},
    BiddingType: {type: String},        
    OfficialBudget: {type: Number, get: getPrice, set: setPrice, default: 0},
    Status: {type: String},
    DocumentEntryDate: {type: Date},
    EntryDocumentReview: {type: Date},
    ExitDocumentReview: {type: Date},
    FirstPG: {type: Date},
    FirstLapPG: {type: Date},
    CallDate: {type: Date},
    BidOpeningDate: {type: Date},
    BidQuantity: [bidQuantitySchema],
    PreAdjudgmentActDate: {type: Date},
    PreAdjudgmentActNumber: {type: String},
    SecondPG: {type: Date},
    SecondLapPG: {type: Date},
    DayQuantity: {type: String},
    ApproveNumber: {type: String},
    ApproveDate: {type: Date},
    AllocatedBudget : {type: Number, get: getPrice, set: setPrice, default: 0},
    SPO: {type: Number},
    Contractor: {type: Schema.Types.ObjectId, ref: 'contractor'},
    ContractDate: {type: Date},
    ProcedureDays: {type: String},
    Observations: {type: String},
    Active: {type: Boolean, default: true}
},{timestamps: true});

biddingMonitoringSchema.set('toObject', {getters: true})
biddingMonitoringSchema.set('toJSON', {getters: true})

bidQuantitySchema.set('toObject', {getters: true})
bidQuantitySchema.set('toJSON', {getters: true})

function getPrice(num){
    return (num/100).toFixed(2)
}

function setPrice(num){
    return num*100
}

const biddingMonitoring = mongoose.model('biddingMonitoring', biddingMonitoringSchema);
module.exports = biddingMonitoring;