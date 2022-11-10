const express = require('express');
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const path = require('path')

const dotenv = require('dotenv')
dotenv.config({ path: 'backend/config/config.env' })

const products = require('./routers/product')

const app = express();

const MONGO_URI         = process.env.DB_URI
const SESS_NAME         = process.env.SESS_NAME
const SESS_SERCRET       = process.env.SESS_SECRET
const SESS_LIFETIME     = 1000 * 60 * 60 * 1

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jewerly Shop',
      version: '1.0.0',
    },
  },
  apis: ['./routes*.js'],
};

const openapiSpecification = swaggerJsdoc(swaggerOptions);

const store = new MongoDBSession({
  uri         : MONGO_URI,
  collection  : 'sessions',
  expires     : 1000
})

app.set("trust proxy", 1)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
  name              : SESS_NAME,
  secret            : SESS_SERCRET,
  resave            : false,
  saveUninitialized : false, 
  store             : store,
  cookie: {
    httpOnly  : false,
    sameSite  : 'lax',
    secure    : false, 
    maxAge    : SESS_LIFETIME
  }
}))

app.use(cors({
  origin      : 'http://localhost:5173',
  methods     : ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials : true
}))

app.use("/static", cors(), express.static(path.join(__dirname, '/public')))

app.use('/api', products)


module.exports = app