const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
 
    res.locals.pool.query(`INSERT INTO compra (idCliente, codigoProduto) VALUES ('${req.body.cliente}', '${req.body.codigo}');`, (erro, resultado, campos) => {
      if (erro) {
        if (erro.toString().includes('ER_NO_REFERENCED_ROW')) res.send('cliente ou produto não existe')
        else throw erro
      }
      else res.send('compra realizada')
    })

  })

  module.exports = router