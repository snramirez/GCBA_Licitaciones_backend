const express = require('express');
const router = express.Router();
const statistics = require('../controllers/statistics');

/*
    Prefijo de las rutas:
    /api/statistics
*/

router.get('/statusDate', statistics.statusDate);
router.get('/biddingType', statistics.biddingType);
router.get('/statusCount', statistics.statusCount);
router.get('/contractor', statistics.contractor);
router.get('/budget', statistics.budget);

router.post('/add', statistics.create);

module.exports = router; 