const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

dotenv.config({ path: 'backend/config/config.env' })

const PORT = process.env.PORT
const MODE = process.env.NODE_ENV

connectDatabase()

const server = app.listen(PORT, () => {
  console.log(`Server started on: http://localhost:${PORT} in ${MODE} mode.`);
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