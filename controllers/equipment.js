const Character = require('../models/character');

module.exports = {
    new: newEquipment,
    create
};

function newEquipment(res, req){
    console.log('newEquipment is being hit');
};

function create(res, req){
    console.log('create is being hit');
};