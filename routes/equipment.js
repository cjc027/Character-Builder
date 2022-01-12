var express = require('express');
var router = express.Router();
const equipmentCtrl = require('../controllers/equipment');

router.get('/characters/:id/equipment/new', equipmentCtrl.new);
router.post('/characters/:id/equipment', equipmentCtrl.create);
router.delete('/characters/:id/equipment/:equipmentId', equipmentCtrl.delete);

module.exports = router;