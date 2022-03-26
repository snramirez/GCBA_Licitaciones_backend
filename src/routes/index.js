const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const bidding = require('../routes/biddingRoutes');


module.exports = (app) => {
    router.get('/', home.index);
    app.use('/api/bidding', bidding);
    

    // app.use('/api/tickets', ticketsRoutes);
    app.use(router);
}