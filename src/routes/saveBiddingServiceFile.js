const express = require('express');
const router = express.Router();
const saveBiddingServiceFile = require('../controllers/saveFileService');

/*
    Prefijo de las rutas:
    /api/saveBiddingService
*/

router.get('/type', saveBiddingServiceFile.getType);
router.post('/type/save', saveBiddingServiceFile.saveType);
router.post('/type/delete', saveBiddingServiceFile.deleteType);

router.get('/status', saveBiddingServiceFile.getStatus);
router.post('/status/save', saveBiddingServiceFile.saveStatus);
router.post('/status/delete', saveBiddingServiceFile.deleteStatus);

router.get('/holiday', saveBiddingServiceFile.getHoliday);
router.post('/holiday/save', saveBiddingServiceFile.saveHoliday);
router.post('/holiday/delete', saveBiddingServiceFile.deleteHoliday);

module.exports = router;