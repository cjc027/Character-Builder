var express = require('express');
var router = express.Router();
const equipmentCtrl = require('../controllers/equipment');

router.get('/characters/:id/equipment/new', isLoggedIn, equipmentCtrl.new);
router.post('/characters/:id/equipment', isLoggedIn, equipmentCtrl.create);
router.delete('/characters/:id/equipment/:equipmentId', isLoggedIn, equipmentCtrl.delete);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
};

module.exports = router;