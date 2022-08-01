const express = require('express');
const router = express.Router();
const bidding = require('../controllers/bidding');

/*
    Prefijo de las rutas:
    /api/bidding
*/

router.get('/', bidding.index);
router.post('/add', bidding.create);
router.post('/addMany', bidding.addMany);

module.exports = router;