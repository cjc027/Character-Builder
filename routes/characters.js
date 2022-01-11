var express = require('express');
var router = express.Router();
const charactersCtrl = require('../controllers/characters');

router.get('/', charactersCtrl.index);
router.get('/new', charactersCtrl.new);
router.post('/', charactersCtrl.create);
router.get('/:id', charactersCtrl.show);

router.delete('/:id', charactersCtrl.delete);
router.get('/:id/edit', charactersCtrl.edit);
// router.put('/:id', charactersCtrl.update);


module.exports = router;