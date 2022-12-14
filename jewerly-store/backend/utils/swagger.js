const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swaggerDocs.json'
const endpointsFiles = [
  './backend/routes/*.js',
]

const doc = {
  info: {
    title: 'Jewerly Shop API',
    description: 'Jewerly Shop',
  },
  host: 'localhost:5000/api',
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
      {
          "name": "User",
          "description": "Endpoints"
      }
  ],
  definitions: { }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // require('../server.js')
})