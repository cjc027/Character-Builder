const Character = require('../models/character');

module.exports = {
    new: newAbilityScores,
    create,
    edit,
    update
};

function newAbilityScores(req, res){

    Character.findOne({_id: req.params.id, userId: req.user._id}, function(err, characterDoc){
        if (err || !characterDoc) return res.redirect(`/characters/${req.params.id}`);
        res.render('abilityScores/new', {
            title: 'Add Ability Scores',
            character: characterDoc
        });
    });
};

function create(req, res){
    
    req.body.strength = parseInt(req.body.strength);
    req.body.dexterity = parseInt(req.body.dexterity);
    req.body.constitution = parseInt(req.body.constitution);
    req.body.wisdom = parseInt(req.body.wisdom);
    req.body.intelligence = parseInt(req.body.intelligence);
    req.body.charisma = parseInt(req.body.charisma);

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

function edit(req, res){

    Character.findOne({_id: req.params.id, userId: req.user._id}, function(err, characterDoc){
        if (err || !characterDoc) return res.redirect(`/characters/${req.params.id}`);

        const abilityPlaceholder = {
            strength: characterDoc.abilityScores[0].strength,
            dexterity: characterDoc.abilityScores[0].dexterity,
            constitution: characterDoc.abilityScores[0].constitution,
            intelligence: characterDoc.abilityScores[0].intelligence,
            wisdom: characterDoc.abilityScores[0].wisdom,
            charisma: characterDoc.abilityScores[0].charisma
        }

        if (characterDoc.race === 'Dragonborn'){
            abilityPlaceholder.strength -= 2;
            abilityPlaceholder.charisma -= 1;
        };

        if (characterDoc.race === 'Dwarf'){
            abilityPlaceholder.constitution -= 2;
            if (characterDoc.subrace === 'Hill Dwarf') {
                abilityPlaceholder.wisdom -= 1;
            } else {
                abilityPlaceholder.strength -= 2;
            };
        };

        if (characterDoc.race === 'Elf'){
            abilityPlaceholder.dexterity -= 2;
            if (characterDoc.subrace === 'High Elf'){
                abilityPlaceholder.intelligence -= 1;
            } else {
                abilityPlaceholder.wisdom -= 1;
            };
        };
        
        if (characterDoc.race === 'Gnome'){
            abilityPlaceholder.intelligence -= 2;
            if (characterDoc.subrace === 'Rock Gnome'){
                abilityPlaceholder.constitution -= 1;
            } else {
                abilityPlaceholder.dexterity -= 1;
            };
        };

        if (characterDoc.race === 'Half-Elf'){
            abilityPlaceholder.charisma -= 2;
        };

        if (characterDoc.race === 'Halfling'){
            abilityPlaceholder.dexterity -= 2;
            if (characterDoc.subrace === 'Lightfoot'){
                abilityPlaceholder.charisma -= 1;
            } else {
                abilityPlaceholder.constitution -= 1;
            }
        };

        if (characterDoc.race === 'Half-Orc'){
            abilityPlaceholder.strength -= 2;
            abilityPlaceholder.constitution -= 1;
        };

        if (characterDoc.race === 'Human'){
            abilityPlaceholder.strength -= 1;
            abilityPlaceholder.dexterity -= 1;
            abilityPlaceholder.constitution -= 1;
            abilityPlaceholder.wisdom -= 1;
            abilityPlaceholder.intelligence -= 1;
            abilityPlaceholder.charisma -= 1;
        };

        if (characterDoc.race === 'Tiefling'){
            abilityPlaceholder.intelligence -= 1;
            abilityPlaceholder.charisma -= 2;
        };

        res.render('abilityScores/edit', {
            title: 'Edit Ability Scores',
            character: characterDoc,
            abilityPlaceholder
        });
    });
};

function update(req, res){

    req.body.strength = parseInt(req.body.strength);
    req.body.dexterity = parseInt(req.body.dexterity);
    req.body.constitution = parseInt(req.body.constitution);
    req.body.wisdom = parseInt(req.body.wisdom);
    req.body.intelligence = parseInt(req.body.intelligence);
    req.body.charisma = parseInt(req.body.charisma);

    Character.findOne({_id: req.params.id, userId: req.user._id}, function(err, characterDoc){
        if (err || !characterDoc) return res.redirect(`/characters/${req.params.id}`);

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
    
        characterDoc.abilityScores.shift();
        characterDoc.abilityScores.push(req.body);
        characterDoc.save(function(err){
            res.redirect(`/characters/${req.params.id}`);
        });
    })

    // Character.findById(req.params.id, function(err, characterDoc){

    // });
}