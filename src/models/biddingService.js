const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidQuantitySchema = new Schema({
    Contractor: {type: Schema.Types.ObjectId, ref: 'contractor'},
    Quantity: {type: Number, get: getPrice, set: setPrice, default: 0}
});

const biddingExtensionSchema = new Schema({
    ExtensionCode: {type: String},
    ExtensionDate: {type: Date},
    Budget: {type: Number, get: getPrice, set: setPrice, default: 0}
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
    Contractor: {type: Schema.Types.ObjectId, ref: 'contractor'},
    ContractDate: {type: Date},
    Extension: {type: Boolean, default: false}, //new
    ExtensionData:{biddingExtensionSchema}, //new
    Prorogation: {type: Boolean, default: false}, //new
    ProrogationExpired: {type: Date}, //new
    ProcedureDays: {type: String}, 
    Observations: {type: String},
    Active: {type: Boolean, default: true}
},{timestamps: true});

biddingServiceSchema.set('toObject', {getters: true})
biddingServiceSchema.set('toJSON', {getters: true})

biddingServiceSchema.set('toObject', {getters: true})
biddingServiceSchema.set('toJSON', {getters: true})

function getPrice(num){
    return (num/100).toFixed(2)
}

function setPrice(num){
    return num*100
}

const biddingService = mongoose.model('biddingService', biddingServiceSchema);
module.exports = biddingService;