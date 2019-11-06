const express = require('express')
const router = express.Router()


/**
 * @swagger
 * /produtos:
 *  post:
 *    description: cadastra o produto
 *    parameters:
 *      - name: produto
 *        description: Objeto a ser cadastrado
 *        type: object
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/produto'
 *    responses:
 *      '200':
 *        description: A succesful
 */

 /**
 * @swagger
 *  definitions:
 *    produto:
 *      type: object
 *      properties:
 *        nome:
 *          type: string
 *          example: Feijão
 *        codigo:
 *          type: integer
 *          format: 'int32'
 *          example: 12212
 *      required:
 *        - nome
 *        - codigo
 */

 
router.post('/', (req, res) => {

    res.locals.pool.query(`INSERT INTO produtos (nome, codigo) VALUES ('${req.body.nome}', '${req.body.codigo}');`, (erro, resultado, campos) => {
      if (erro) {
        if (erro.toString().includes('ER_DUP_ENTRY')) res.send('codigo repetido')
        else throw erro
      } else res.send('Produto Inserido')
    })
  
  })

  /**
 * @swagger
 * /produtos:
 *  get:
 *    description: lista os produtos
 *    parameters:
 *      - name: codigo
 *      in: query
 *      type: integer
 *    responses:
 *      '200':
 *        description: A succesful
 */

  router.get('/', (req, res) => {
      let comando = 'SELECT nome, codigo FROM produtos'
      
      res.locals.pool.query(`${comando} WHERE codigo = ${req.query.codigo} or true`, (erro, resultado, campos) => {
        if (erro) {
            throw erro
          } else {
            let produtos = resultado.map(elemento => elemento)
            res.send(produtos)
          }
      })
  
  })


  module.exports = router