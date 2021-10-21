const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()

//MIDDLEWARES
app.use(cors())
app.use(express.json({extended:false}))
app.use(helmet())
app.use(morgan('dev'))

//ROUTES
// app.use('/queue/repos',require('./routes/repos'))
app.use('/queue/users',require('./routes/users'))


//SERVER START
const PORT = process.env.PORT
app.listen(PORT, () =>  console.log(`server started on port ${PORT}`))