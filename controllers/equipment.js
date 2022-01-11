const Character = require('../models/character');

module.exports = {
    new: newEquipment,
    create
};

function newEquipment(req, res){
    console.log('newEquipment is being hit');

    Character.findById(req.params.id, function(err, characterDoc){
        res.render('equipment/new', {
            title: 'Add Equipment',
            character: characterDoc
        });
    });
};

function create(req, res){
    console.log('create is being hit', req.body, req.params.id);

    req.body.cost = parseInt(req.body.cost);
    Character.findById(req.params.id, function(err, characterDoc){
        characterDoc.equipment.push(req.body);
        characterDoc.save(function(err){
            res.redirect(`/characters/${req.params.id}`);
        });
    });
};