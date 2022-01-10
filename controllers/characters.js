const Character = require('../models/character');

module.exports = {
    index,
    new: newCharacter,
    create
}

function index(req, res){
    if (req.user) {
        Character.find({userId: req.user._id}, function(err, characterDocs){
            res.render('characters/index', {
                title: 'My Characters',
                characters: characterDocs
            });
        });
    } else {
        res.redirect('/');
    }
}

function newCharacter(req, res){
    if (req.user) {
        res.render('characters/new', {
            title: 'New Character'
        });
    } else {
        res.redirect('/');
    }
}

function create(req, res){
    console.log(req.body);
}