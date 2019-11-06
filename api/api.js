const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const clienteRouter = require('./controllers/clientes')
const produtoRouter = require('./controllers/produtos')
const compraRouter = require('./controllers/compras')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "C",
      description: "C",
      contact: {
        name: "Beatriz Alcantara"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["api.js", "controllers/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(cors())
app.use(express.json())


app.use(function(req, res, next) {
	res.locals.pool = mysql.createPool({
		host: 'remotemysql.com',
    user: 'WjRuXH9No8',
    password: 'l2tHGaTkRa',
    database: 'WjRuXH9No8',
		timezone: 'UTC+0'
	});
	next();
});

app.use('/clientes', clienteRouter)
app.use('/produtos', produtoRouter)
app.use('/compras', compraRouter)


app.listen(3000, () => console.log('Api rodando'))
