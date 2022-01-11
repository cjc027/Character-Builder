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
    // console.log('create is being hit', req.body, req.params.id);

    Character.findById(req.params.id, function(err, characterDoc){
        if (characterDoc.race === 'Dragonborn'){
            req.body.strength += 2;
            req.body.charisma += 1;
        };

        if (characterDoc.race === 'Dwarf'){
            req.body.constitution += 2;
            if (characterDoc.subrace === 'Hill Dwarf') {
                req.body.wisdom += 1;
            } else {
                req.body.strength += 2;
            };
        };

        if (characterDoc.race === 'Elf'){
            req.body.dexterity += 2;
            if (characterDoc.subrace === 'High Elf'){
                req.body.intelligence += 1;
            } else {
                req.body.wisdom += 1;
            };
        };
        
        if (characterDoc.race === 'Gnome'){
            req.body.intelligence += 2;
            if (characterDoc.subrace === 'Rock Gnome'){
                req.body.constitution += 1;
            } else {
                req.body.dexterity += 1;
            };
        };

        if (characterDoc.race === 'Half-Elf'){
            req.body.charisma += 2;
        };

        if (characterDoc.race === 'Halfling'){
            req.body.dexterity += 2;
            if (characterDoc.subrace === 'Lightfoot'){
                req.body.charisma += 1;
            } else {
                req.body.constitution += 1;
            }
        };

        if (characterDoc.race === 'Half-Orc'){
            req.body.strength += 2;
            req.body.constitution += 1;
        };

        if (characterDoc.race === 'Human'){
            req.body.strength += 1;
            req.body.dexterity += 1;
            req.body.constitution += 1;
            req.body.wisdom += 1;
            req.body.intelligence += 1;
            req.body.charisma += 1;
        };

        if (characterDoc.race === 'Tiefling'){
            req.body.intelligence += 1;
            req.body.charisma += 2;
        };

        characterDoc.abilityScores.push(req.body);
        characterDoc.save(function(err){
            res.redirect(`/characters/${req.params.id}`);
        });
    });
};