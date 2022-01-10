const Character = require('../models/character');

module.exports = {
    index
}

function index(req, res){
    if (req.user) {
        res.render('characters/index', {
            title: 'My Characters'
        })
    } else {
        res.redirect('/')
    }
}