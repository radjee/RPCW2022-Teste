var express = require('express');
var axios = require('axios');
var router = express.Router();

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNzYwOSwiZXhwIjoxNjU0MDQ2NDA5fQ.jhkUQwMPir_ZAQfcUZSXyey0GDJPD0DS3Qx54imFMQmQeTDCg34Oqtzx61pYp0EJ3P9ynDnuBWU_SJyfd4WtWAg_dWnomaasRGlVcxiIdwck4p31lMvteC4U4ovvMh7pL5nXkcBwFR0FoBCLCCFoHV6nEZ3NV9lytOgEa9XpwIIRKcJcF8Qn6sxdSIDcbKKmc9CW37suHOTDfC5meri6OSxyEP270Wq7IuqyECzQeSqqnZylG4uNDaXyc0bOK1GKRwHSYoVaxydeFsL91L56-CzjmGgtJVTF4SZSTD5IPhAUDNCx1NQRF1KzECXj3gqtXl2zjuQ40zp-QC7yQfV4Gw'

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
    .then(resp => {
      data = {
        title: "Página Inicial",
        description: 'Página com a lista de classes de nível 1.'
      }
      data['list'] = resp.data
      res.render('index', data)
    })
    .catch(erro => {
      res.status(500).jsonp(erro)
    })
});

router.get('/:id', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '?token=' + token)
    .then(resp => {
      console.log(resp.data)
      res.render('process', resp.data)
    })
    .catch(erro => {
      res.status(501).jsonp(erro)
    })
});

// Queries
router.get('/queries/q1', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=3&token=' + token)
      .then(resp => {
          counter = 0;
          descendentes = [];

          resp.data.forEach(processo => {
              paiID = processo.codigo.split('.')
              if (paiID[0] == '750') {
                  counter += 1;
                  descendentes.push(processo)
              }
          })
          res.render('query', {title: 'Query 1', description: 'Processos pertencentes à descendência da classe 750: ' + counter + ' processos', dados: descendentes});
      })
      .catch(erro => {
          console.log(erro)
      })
});

// router.get('/queries/q2', (req, res, next) => {
//   axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
//     .then(resp => {
//       total = resp.data.length
//       res.render('query', {title: 'Query 2', description: 'Total de subprocessos: ' + total, dados: resp.data});
//     })
//     .catch(erro => {
//       console.log(erro)
//     })
// })

router.get('/queries/q3', (req, res, next) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c750.20/descendencia?nivel=3&token=' + token)
    .then(resp => {
      total = resp.data.length
      res.render('query', {title: 'Query 3', description: 'Total de subprocessos: ' + total, dados: resp.data});
    })
    .catch(erro => {
      console.log(erro)
    })
})

router.get('/queries/q4', (req, res, next) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c750.20.600/procRel?nivel=3&token=' + token)
    .then(resp => {
      total = resp.data.length
      res.render('query', {title: 'Query 4', description: 'Total de subprocessos: ' + total, dados: resp.data});
    })
    .catch(erro => {
      console.log(erro)
    })
})

module.exports = router;
