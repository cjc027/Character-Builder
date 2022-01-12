var express = require('express');
var router = express.Router();
const charactersCtrl = require('../controllers/characters');

router.get('/', isLoggedIn, charactersCtrl.index);
router.get('/new', isLoggedIn, charactersCtrl.new);
router.post('/', isLoggedIn, charactersCtrl.create);
router.get('/:id', charactersCtrl.show);

router.delete('/:id', isLoggedIn, charactersCtrl.delete);
router.get('/:id/edit', isLoggedIn, charactersCtrl.edit);
router.put('/:id', isLoggedIn, charactersCtrl.update);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
};

module.exports = router;