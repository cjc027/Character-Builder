const Character = require('../models/character');

module.exports = {
    new: newEquipment,
    create,
    delete: deleteEquipment
};

function newEquipment(req, res){
    // if (!req.user) return res.redirect(`/characters/${req.params.id}`);

    Character.findById(req.params.id, function(err, characterDoc){
        res.render('equipment/new', {
            title: 'Add Equipment',
            character: characterDoc
        });
    });
};

function create(req, res){
    console.log(req.body)

    req.body.cost = parseInt(req.body.cost);
    Character.findById(req.params.id, function(err, characterDoc){
        characterDoc.equipment.push(req.body);
        characterDoc.save(function(err){
            res.redirect(`/characters/${req.params.id}`);
        });
    });
};

function deleteEquipment(req, res){

    // if (!req.user) return res.redirect(`/characters/${req.params.id}`);

    Character.findOne({_id: req.params.id, userId: req.user._id}, function(err, characterDoc){
        if (err || !characterDoc) return res.redirect(`/characters/${req.params.id}`);
        characterDoc.equipment.id(req.params.equipmentId).remove();
        characterDoc.save(function(err){
            res.redirect(`/characters/${req.params.id}`);
        });
    })
    
}