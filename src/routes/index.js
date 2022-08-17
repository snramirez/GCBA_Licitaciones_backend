const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const bidding = require('../routes/biddingRoutes');
const statistics = require('../routes/statistics');
const saveFile = require('../routes/saveFile');


module.exports = (app) => {
    router.get('/', home.index);
    app.use('/api/bidding', bidding);
    app.use('/api/statistics', statistics);
    app.use('/api/save', saveFile);

    
    app.use(router);
}