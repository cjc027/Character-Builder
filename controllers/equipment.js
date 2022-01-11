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
};