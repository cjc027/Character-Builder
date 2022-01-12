const Character = require('../models/character');
const editCharacter = require('../public/js/editCharacter');

module.exports = {
    index,
    new: newCharacter,
    create,
    show,
    delete: deleteCharacter,
    edit,
    update
};

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
    };
};

function newCharacter(req, res){
    if (req.user) {
        res.render('characters/new', {
            title: 'New Character'
        });
    } else {
        res.redirect('/');
    };
};

function create(req, res){
    console.log(req.body);

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
        userId: req.user._id,
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
}

function show(req, res){
    Character.findById(req.params.id, function(err, characterDoc){
        res.render('characters/show', {
            character: characterDoc,
            title: characterDoc.name
        })
    })
}

function deleteCharacter(req, res){
    // console.log('deleteCharacter is being hit');
    // console.log(req.params.id);
    Character.deleteOne({_id: req.params.id}, function(err, deletedDoc){
        // console.log(deletedDoc);
        res.redirect('/characters');
    });
}

function edit(req, res){
    console.log('edit is being hit')
    Character.findById(req.params.id, function(err, characterDoc){
        res.render('characters/edit', {
            character: characterDoc,
            title: 'Edit Character',
            editCharacter
        })
    })
}

function update(req, res){
    console.log('update is being hit');
    console.log(req.user)
    // console.log(req.body);
    if (req.user) {
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
            // userId: req.user._id,
            race: req.body.race,
            subrace: req.body.subrace,
            class: req.body.class,
            alignment: req.body.alignment,
            characteristics: req.body.characteristics,
            background: req.body.background
        };
    
        
        Character.updateOne({_id: req.params.id}, updatedCharacter, function(err, characterDoc){
            console.log(characterDoc, "document!");
            res.redirect(`/characters/${req.params.id}`);
        });


    } else {
        res.redirect('/');
    }


}