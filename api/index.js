const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { ApolloServer, ApolloError, ValidationError, gql } = require('apollo-server-express');
const app = express()



//MIDDLEWARES
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))



//SERVER START
const PORT = process.env.PORT
app.listen(PORT, () =>  console.log(`server started on port ${PORT}`))
