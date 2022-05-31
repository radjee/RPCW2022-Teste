var Ligacao = require('../models/ligacoes')

module.exports.listarOrigem = function(origem){
    return Ligacao
            .find({origem: origem}, {_id: 0, id: 1,  origem: 1, destino: 1})
}

module.exports.listarDist = function(dist){
    return Ligacao
            .find({distancia: {$gte: dist}}, {_id: 0, id: 1, origem: 1, destino: 1})
}