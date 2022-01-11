const Character = require('../models/character');

module.exports = {
    new: newEquipment,
    create
};

function newEquipment(req, res){
    console.log('newEquipment is being hit');
};

function create(req, res){
    console.log('create is being hit');
};