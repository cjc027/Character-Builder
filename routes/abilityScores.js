var express = require('express');
var router = express.Router();
const abilityScoresCtrl = require('../controllers/abilityScores');

router.get('/characters/:id/abilityScores/new', abilityScoresCtrl.new);
router.post('/characters/:id/abilityScores', abilityScoresCtrl.create);

module.exports = router;