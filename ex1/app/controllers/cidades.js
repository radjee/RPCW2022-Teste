var Cidade = require('../models/cidades')

module.exports.listar = function(){
    return Cidade
            .find({}, {_id: 0, id: 1, nome: 1, distrito: 1})
            .exec()
}

module.exports.consultarCidade = function(id){
    return Cidade
            .findOne({id: id}, {_id: 0})
            .exec()
}

module.exports.consultarDistrito = function(distrito){
    return Cidade
            .find({distrito: distrito}, {_id: 0, id: 1, nome: 1})
}

module.exports.nomesCidade = function(){
    return Cidade
            .find({}, {_id: 0, nome: 1}).sort({nome: 1})
}

module.exports.distrito = function(){
    return Cidade
            .find({}, {_id: 0, id: 1, distrito: 1, nome: 1})
}