const express = require('express');
const router = express.Router();
const saveFile = require('../controllers/saveFile');

/*
    Prefijo de las rutas:
    /api/save
*/

router.post('/', saveFile.saveType);
// router.post('/add', saveFile.create);
// router.post('/addMany', saveFile.addMany);

module.exports = router;