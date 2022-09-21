const express = require('express');
const router = express.Router();
const saveFile = require('../controllers/saveFile');

/*
    Prefijo de las rutas:
    /api/save
*/

router.get('/type', saveFile.getType);
router.post('/type/save', saveFile.saveType);
router.post('/type/delete', saveFile.deleteType);
router.get('/status', saveFile.getStatus);
router.post('/status/save', saveFile.saveStatus);
router.post('/status/delete', saveFile.deleteStatus);

module.exports = router;