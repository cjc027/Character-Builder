var express = require('express');
var router = express.Router();
const charactersCtrl = require('../controllers/characters');

router.get('/', charactersCtrl.index);
router.get('/new', charactersCtrl.new);


module.exports = router;