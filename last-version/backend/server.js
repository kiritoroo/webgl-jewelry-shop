const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')

dotenv.config()

connectDatabase();

const PORT = process.env.PORT
const MODE = process.env.NODE_ENV

const server = app.listen(PORT, () => {
  console.log(`Server started on: http://localhost:${PORT} in ${MODE} mode.\nAPI documentation: http://localhost:5000/docs"`);
})

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${ err.stack }`)
  process.exit(1)
})

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${ err.message }`)
  server.close(() => {
    process.exit(1)
  })
})