const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const bidding = require('../routes/biddingRoutes');
const statistics = require('../routes/statistics');


module.exports = (app) => {
    router.get('/', home.index);
    app.use('/api/bidding', bidding);
    app.use('/api/statistics', statistics);
    
    app.use(router);
}