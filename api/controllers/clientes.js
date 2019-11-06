const express = require('express')
const router = express.Router()


router.post('/', (req, res) => {
    
    res.locals.pool.query(`INSERT INTO clientes (nome) VALUES ('${req.body.nome}');`, (erro, resultado, campos) => {
      if (erro) throw erro
      res.send('Cadastrado com Sucesso')
    })
  
  })

  router.get('/', (req, res) => {
   
    res.locals.pool.query(`SELECT nome, id FROM clientes;`, (erro, resultado, campos) => {
      if (erro) {
        throw erro
      } else {
        let clientes = resultado.map(elemento => elemento)
        res.send(clientes)
      }
    })
 })

module.exports = router