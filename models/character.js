const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const abilitySchema = new Schema({
    strength: {type: Number, required: true, min: 3},
    dexterity: {type: Number, required: true, min: 3},
    constitution: {type: Number, required: true, min: 3},
    intelligence: {type: Number, required: true, min: 3},
    wisdom: {type: Number, required: true, min: 3},
    charisma: {type: Number, required: true, min: 3}
});

const equipmentSchema = new Schema({
    name: {type: String, required: true},
    cost: Number,
    currency: String,
    weight: Number
});

const characterSchema = new Schema({
    name: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    portrait: {type: String, default: 'default'},
    race: {
        type: String, 
        required: true,
        enum: ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling']
    },
    subrace: String,
    class: {
        type: String, 
        required: true,
        enum: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']
    },
    alignment: String,
    characteristics: String,
    background: String,
    abilityScores: [abilitySchema], // I think I want an array so that I can change button behavior from 'Add' to 'Edit' depending on array.length
    equipment: [equipmentSchema]
});


module.exports = mongoose.model('Character', characterSchema);

