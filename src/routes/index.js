const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const bidding = require('../routes/biddingRoutes');
const biddingService = require('../routes/biddingServiceRoutes');
const statistics = require('../routes/statistics');
const saveBiddingFile = require('../routes/saveBiddingFile');
const saveBiddingServiceFile = require('../routes/saveBiddingServiceFile');
const contractor = require('../routes/contractorRoutes');
const authRoutes = require('./authRoutes');


module.exports = (app) => {
    router.get('/', home.index);
    app.use('/api/bidding', bidding);
    app.use('/api/biddingService', biddingService);
    app.use('/api/statistics', statistics);
    app.use('/api/saveBidding', saveBiddingFile);
    app.use('/api/saveBiddingService', saveBiddingServiceFile);
    app.use('/api/contractor', contractor);
    app.use('/api/auth', authRoutes);

    
    app.use(router);
}