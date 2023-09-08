const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const biddingExtensionSchema = new Schema({
    ExtensionCode: {type: String},
    ExtensionDate: {type: Date},
    PurchaseOrder: {type: String},
    Budget: {type: Number, get: getPrice, set: setPrice, default: 0}
});

const biddingProrogationSchema = new Schema({
    ProrrogationCode: {type: String},
    ProrogationDate: {type: Date},
});

const bidQuantitySchema = new Schema({
    Contractor: [{type: Schema.Types.ObjectId, ref: 'contractor'}],
    Quantity: {type: Number, get: getPrice, set: setPrice, default: 0},
    Winner: {type: Boolean, default: false},
    Observations: {type: String},
    ExtensionData: [biddingExtensionSchema],
    ProrogationExpired: [biddingProrogationSchema],
    ContractDate: {type: Date},
    PurchaseOrder: {type: String},
    DueDatePO: {type: Date},
    AllocatedBudget : {type: Number, get: getPrice, set: setPrice, default: 0},
});

const biddingServiceSchema = new Schema({
    BiddingNumber: {type: String},
    Record: {type: String},
    RecordBAC: {type: String},
    Bidding: {type: String},
    Responsable: {type: String},
    Division: {type: String},
    BiddingType: {type: String},        
    DirectContractType: {type: String},   //new   
    DocumentationComplete: {type: Boolean, default: false}, //new
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
    PurchaseOrderMode: {type: String},
    Observations: {type: String},
    Active: {type: Boolean, default: true}
},{timestamps: true});

biddingServiceSchema.set('toObject', {getters: true})
biddingServiceSchema.set('toJSON', {getters: true})

bidQuantitySchema.set('toObject', {getters: true})
bidQuantitySchema.set('toJSON', {getters: true})

biddingExtensionSchema.set('toObject', {getters: true})
biddingExtensionSchema.set('toJSON', {getters: true})

function getPrice(num){
    return (num/100).toFixed(2)
}

function setPrice(num){
    return num*100
}

const biddingService = mongoose.model('biddingService', biddingServiceSchema);
module.exports = biddingService;