const Character = require('../models/character');

module.exports = {
    new: newAbilityScores,
    create
};

function newAbilityScores(req, res){
    console.log('newAbilityScores is being hit', req.params.id);
    
    Character.findById(req.params.id, function(err, characterDoc){
        res.render('abilityScores/new', {
            title: 'Add Ability Scores',
            character: characterDoc
        });
    });
    
};

function create(req, res){
    console.log('create is being hit');
};