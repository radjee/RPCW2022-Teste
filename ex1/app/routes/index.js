var express = require('express');
var router = express.Router();
const Cidade = require('../controllers/cidades')
const Ligacao = require('../controllers/ligacoes');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/cidades/nomes', function (req, res, next) {
  Cidade.nomesCidade()
    .then(dados => {
      dados_n = []
      dados.forEach((cidade) => {
        dados_n.push(cidade.nome)
      })
      res.status(200).jsonp(dados_n)
    })
    .catch(e => {
      res.status(500).jsonp({
        erro: e
      })
    })
})

router.get('/cidades', function (req, res, next) {
  if (req.query['distrito'] != undefined) {
    Cidade.consultarDistrito(req.query['distrito'])
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(e => {
        res.status(500).jsonp({
          erro: e
        })
      })
  } else {
    Cidade.listar(req.params.id)
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(e => {
        res.status(500).jsonp({
          error: e
        })
      })
  }
})

router.get('/cidades/:id', function (req, res, next) {
  Cidade.consultarCidade(req.params.id)
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(e => {
      res.status(500).jsonp({
        error: e
      })
    })
})

router.get('/distritos', function (req, res, next) {
  Cidade.distrito()
    .then(dados => {
      const dict = new Map()
      dados.forEach((cidade) => {
        if (dict.has(cidade.distrito)) {
          dict.get(cidade.distrito).push([cidade.id, cidade.nome])
        } else {
          dict.set(cidade.distrito, [
            [cidade.id, cidade.nome]
          ])
        }
      })
      res.status(200).jsonp([...dict])
    })
    .catch(e => {
      res.status(500).jsonp({
        error: e
      })
    })
})

router.get('/ligacoes', function (req, res, next) {
  if (req.query['origem'] != undefined) {
    Ligacao.listarOrigem(req.query['origem'])
      .then(ligacoes => {
        Cidade.listar()
          .then(cidades => {
            dados_n = []
            ligacoes.forEach((ligacao) => {
              cidades.forEach((cidade) => {
                if (ligacao.destino == cidade.id) {
                  elem = {
                    id: ligacao.id,
                    destino: ligacao.destino,
                    nome_destino: cidade.nome
                  }
                  dados_n.push(elem)
                }
              })
            })
            res.status(200).jsonp(dados_n)
          })
      })
      .catch(e => {
        res.status(500).jsonp({
          erro: e
        })
      })
  } else if (req.query['dist'] != undefined) {
    Ligacao.listarDist(req.query['dist'])
      .then(ligacoes => {
        Cidade.listar()
          .then(cidades => {
            dados_n = []
            ligacoes.forEach((ligacao) => {
              nome_destino = ''
              nome_origem = ''
              cidades.forEach((cidade) => {
                if (ligacao.destino == cidade.id) {
                  nome_destino = cidade.nome

                }
                if (ligacao.origem == cidade.id)
                  nome_origem = cidade.nome

              })

              elem = {
                id: ligacao.id,
                origem: ligacao.origem,
                nome_origem: nome_origem,
                destino: ligacao.destino,
                nome_destino: nome_destino
              }
              dados_n.push(elem)
            })
            res.status(200).jsonp(dados_n)
          })
      })
      .catch(e => {
        res.status(500).jsonp({
          erro: e
        })
      })
  }
})

module.exports = router;