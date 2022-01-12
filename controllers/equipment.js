const Character = require('../models/character');

module.exports = {
    new: newEquipment,
    create,
    delete: deleteEquipment
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

function deleteEquipment(req, res){
    console.log('deleteEquipment is being hit', req.query);
    console.log(req.params);

    Character.findById(req.params.id, function(err, characterDoc){
        characterDoc.equipment.id(req.params.equipmentId).remove();
        characterDoc.save(function(err){
            res.redirect(`/characters/${req.params.id}`);
        })
    })
    
}