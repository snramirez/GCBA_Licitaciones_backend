const express = require('express');
const router = express.Router();
const biddingService = require('../controllers/biddingService');

/*
    Prefijo de las rutas:
    /api/biddingService
*/

router.get('/', biddingService.index);
router.post('/add', biddingService.create);
router.post('/edit', biddingService.edit);
router.post('/delete', biddingService.delete);
router.post('/addMany', biddingService.addMany);

module.exports = router;
