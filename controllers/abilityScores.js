const Character = require('../models/character');

module.exports = {
    new: newAbilityScores,
    create
};

function newAbilityScores(res, req){
    res.send('newEquipment is being hit');
};

function create(res, req){
    res.send('create is being hit');
};