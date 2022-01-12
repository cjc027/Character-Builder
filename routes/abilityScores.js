var express = require('express');
var router = express.Router();
const abilityScoresCtrl = require('../controllers/abilityScores');

router.get('/characters/:id/abilityScores/new', isLoggedIn, abilityScoresCtrl.new);
router.post('/characters/:id/abilityScores', isLoggedIn, abilityScoresCtrl.create);

router.get('/characters/:id/abilityScores/edit', isLoggedIn, abilityScoresCtrl.edit);
router.put('/characters/:id/abilityScores', isLoggedIn, abilityScoresCtrl.update);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
};

module.exports = router;