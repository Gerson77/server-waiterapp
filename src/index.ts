import express from 'express'
import mongoose from 'mongoose'
import { router } from './router'
import path from 'node:path'
import http from 'node:http'
import { Server } from 'socket.io'
import 'dotenv/config'

const URL_DB: string = process.env.MONGO_ATLAS || ''

const URL_FE: string = process.env.URL_FRONTEND || ''

const app = express()
const server = http.createServer(app)
export const io = new Server(server)

mongoose.connect(URL_DB)
.then(() => {
    const port = 3000

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', URL_FE),
      res.setHeader('Access-Control-Allow-Methods', '*'),
      res.setHeader('Access-Control-Allow-Headers', '*')

      next()
    })

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(express.json())
    app.use(router)

    server.listen(3000, () => console.log(`Server is running port:${port}`))
  })
  .catch(() => console.log('Erro ao conectar no mongodb'))

