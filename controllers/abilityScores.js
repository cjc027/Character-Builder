const Character = require('../models/character');

module.exports = {
    new: newAbilityScores,
    create
};

function newAbilityScores(res, req){
    console.log('newAbilityScores is being hit');
};

function create(res, req){
    console.log('create is being hit');
};