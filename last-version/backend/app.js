const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('../swaggerDocs.json')
const express = require("express")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const errorMiddleware = require('./middlewares/errors')
// const SET_EXPRESS_APP = require('mgr-swagger-express').SET_EXPRESS_APP

const products = require('./routes/product')
const auth = require('./routes/auth');

const app = express()
// SET_EXPRESS_APP(app)

app.set("trust proxy", 1)
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
  origin      : ['http://localhost:5173', 'http://127.0.0.1:5000'],
  methods     : ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials : true
}))
app.use("/static", cors(), express.static(path.join(__dirname, '/static')))

// All Routes
app.use('/api', products)
app.use('/api', auth)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));
app.use(errorMiddleware);

module.exports = app
