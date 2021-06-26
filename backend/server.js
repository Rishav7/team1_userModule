// import express from 'express'
// import dotenv from 'dotenv'
// import connectDB from './config/db.js'
// import colors from 'colors'

const express= require('express')
require('dotenv').config()
// import dotenv from 'dotenv'
const colors=require('colors')
const connectDB= require('./config/db.js')

// import userRoutes from './routes/userRoutes.js'
const userRoutes = require('./routes/userRoutes.js')
// import fileupload from 'express-fileupload'
const fileupload= require('express-fileupload')
//import middleware 

// import { notFound, errorHandler } from './middleware/errorMiddleware.js'
const {notFound,errorHandler} = require('./middleware/errorMiddleware.js')

// dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.use(fileupload())
app.use('/dp', express.static('backend/public/uploads'))

app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold))