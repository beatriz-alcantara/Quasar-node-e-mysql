const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/cadastro/cliente', (req, res) => {
  // Configurando a conexão com o banco de dados

  const banco = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'WjRuXH9No8',
    password: 'l2tHGaTkRa',
    database: 'WjRuXH9No8'
  })

  banco.connect() // Conectando no banco

  banco.query(`INSERT INTO clientes (nome) VALUES ('${req.body.nome}');`, (erro, resultado, campos) => {
    if (erro) throw erro
    res.send('Cadastrado com Sucesso')
  })

  banco.end()
})

app.post('/cadastro/produto', (req, res) => {

  const banco = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'WjRuXH9No8',
    password: 'l2tHGaTkRa',
    database: 'WjRuXH9No8'
  })

  banco.connect()

  banco.query(`INSERT INTO produtos (nome, codigo) VALUES ('${req.body.nome}', '${req.body.codigo}');`, (erro, resultado, campos) => {
    if (erro) {
      if (erro.toString().includes('ER_DUP_ENTRY')) res.send('codigo repetido')
      else throw erro
    } else res.send('Produto Inserido')
  })

  banco.end()
})

app.post('/compra', (req, res) => {

  const banco = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'WjRuXH9No8',
    password: 'l2tHGaTkRa',
    database: 'WjRuXH9No8'
  })

  banco.connect()

  banco.query(`INSERT INTO compra (idCliente, codigoProduto) VALUES ('${req.body.cliente}', '${req.body.codigo}');`, (erro, resultado, campos) => {
    if (erro) {
      if (erro.toString().includes('ER_NO_REFERENCED_ROW')) res.send('cliente ou produto não existe')
      else throw erro
    }
    else res.send('compra realizada')
  })

  banco.end()
})

app.get('/clientes', (req, res) => {
  const banco = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'WjRuXH9No8',
    password: 'l2tHGaTkRa',
    database: 'WjRuXH9No8'
  })

  banco.connect()

  banco.query(`SELECT nome, id FROM clientes;`, (erro, resultado, campos) => {
    if (erro) {
      throw erro
    } else {
      let clientes = resultado.map(elemento => elemento)
      res.send(clientes)
    }
  })

  banco.end()
})

app.get('/produtos', (req, res) => {
  const banco = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'WjRuXH9No8',
    password: 'l2tHGaTkRa',
    database: 'WjRuXH9No8'
  })

  banco.connect()

  banco.query(`SELECT nome, codigo FROM produtos;`, (erro, resultado, campos) => {
    if (erro) {
      throw erro
    } else {
      let produtos = resultado.map(elemento => elemento)
      res.send(produtos)
    }
  })

  banco.end()
})

app.listen(3000, () => console.log('Api rodando'))
