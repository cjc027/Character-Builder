const Character = require('../models/character');

module.exports = {
    new: newEquipment,
    create
};

function newEquipment(res, req){
    res.send('newEquipment is being hit');
};

function create(res, req){
    res.send('create is being hit');
};