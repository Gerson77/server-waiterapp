import express from 'express'
import mongoose from 'mongoose'
import { router } from './router'
import path from 'node:path'
import http from 'node:http'
import { Server } from 'socket.io'
import 'dotenv/config'

const URL_DB: string = process.env.MONGODB_URI || ''

const app = express()
const server = http.createServer(app)
export const io = new Server(server)

mongoose.connect(URL_DB)
.then(() => {
    const port = 3000

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*'),
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH'),
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

      next()
    })

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(express.json())
    app.use(router)

    server.listen(3000, () => console.log(`Server is running port:${port}`))
  })
  .catch(() => console.log('Erro ao conectar no mongodb'))
