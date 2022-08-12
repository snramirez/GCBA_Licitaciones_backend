const express = require('express');
const router = express.Router();
const bidding = require('../controllers/saveFile');

/*
    Prefijo de las rutas:
    /api/save
*/

router.post('/', saveFile.saveType);
// router.post('/add', saveFile.create);
// router.post('/addMany', saveFile.addMany);

module.exports = router;