const express = require('express');
const router = express.Router();
const contractor = require('../controllers/contractor');

/*
    Prefijo de las rutas:
    /api/contractor
*/

router.get('/', contractor.index);
router.post('/add', contractor.create);
router.post('/edit', contractor.edit);
router.post('/delete', contractor.delete);

module.exports = router;