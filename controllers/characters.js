const Character = require('../models/character');
const editCharacter = require('../public/js/editCharacter');

module.exports = {
    index,
    new: newCharacter,
    create,
    show,
    delete: deleteCharacter,
    edit,
    update,
    editPortrait,
    updatePortrait
};

function index(req, res){
    Character.find({userId: req.user._id}, function(err, characterDocs){
        res.render('characters/index', {
            title: 'My Characters',
            characters: characterDocs
        });
    });
};

function newCharacter(req, res){
    res.render('characters/new', {
        title: 'New Character'
    });
};

function create(req, res){

    // if (!req.user) return res.redirect('/');

    if (req.body.subrace === 'Empty'){
        if (req.body.race === 'Dwarf'){
            req.body.subrace = 'Mountain Dwarf'
        } else if (req.body.race === 'Elf'){
            req.body.subrace = 'Wood Elf'
        } else if (req.body.race === 'Halfling'){
            req.body.subrace = 'Lightfoot'
        } else if (req.body.race === 'Gnome'){
            req.body.subrace = 'Rock Gnome'
        } else {
            req.body.subrace = ''
        }
    };

    const newCharacter = {
        name: req.body.name,
        userId: req.user._id, // reference userId
        race: req.body.race,
        subrace: req.body.subrace,
        class: req.body.class,
        alignment: req.body.alignment,
        characteristics: req.body.characteristics,
        background: req.body.background
    };

    Character.create(newCharacter, function(err, characterDoc){
        console.log(characterDoc);
        res.redirect(`/characters`);
    });
};

function show(req, res){
    Character.findById(req.params.id, function(err, characterDoc){
        res.render('characters/show', {
            character: characterDoc,
            title: characterDoc.name
        });
    });
};

function deleteCharacter(req, res){
    Character.findOneAndDelete({_id: req.params.id, userId: req.user._id}, function(err){
        res.redirect('/characters');
    });
};

function edit(req, res){
    Character.findById(req.params.id, function(err, characterDoc){
        res.render('characters/edit', {
            character: characterDoc,
            title: 'Edit Character',
            editCharacter
        });
    });
};

function update(req, res){
    if (req.body.subrace === 'Empty'){
        if (req.body.race === 'Dwarf'){
            req.body.subrace = 'Mountain Dwarf'
        } else if (req.body.race === 'Elf'){
            req.body.subrace = 'Wood Elf'
        } else if (req.body.race === 'Halfling'){
            req.body.subrace = 'Lightfoot'
        } else if (req.body.race === 'Gnome'){
            req.body.subrace = 'Rock Gnome'
        } else {
            req.body.subrace = ''
        }
    };
    
    const updatedCharacter = {
        name: req.body.name,
        race: req.body.race,
        subrace: req.body.subrace,
        class: req.body.class,
        alignment: req.body.alignment,
        characteristics: req.body.characteristics,
        background: req.body.background
    };

    Character.findOneAndUpdate(
        {_id: req.params.id, userId: req.user._id}, 
        updatedCharacter,
        {new: true},
        function(err, characterDoc){
            if (err || !characterDoc) return res.redirect('/characters');
            res.redirect(`/characters/${req.params.id}`);
        });
};

function editPortrait(req, res){

    Character.findOne({_id: req.params.id, userId: req.user._id}, function(err, characterDoc){
        if (err || !characterDoc) return res.redirect(`/characters/${req.params.id}`);

        res.render('characters/portrait', {
            title: 'Select Portrait',
            character: characterDoc
        });
    });
};

function updatePortrait(req, res){

    Character.findOne({_id: req.params.id, userId: req.user._id}, function(err, characterDoc){
        if (err || !characterDoc) return res.redirect(`/characters/${req.params.id}`);

        characterDoc.portrait = req.body.portrait;
        characterDoc.save(function(err){
            res.redirect(`/characters/${req.params.id}`);
        });
    });

}