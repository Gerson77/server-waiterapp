// import express from 'express'
// import mongoose from 'mongoose'
// import { router } from './router'
// import path from 'node:path'
// import http from 'node:http'
// import { Server } from 'socket.io'
// import 'dotenv/config'

// const URL_DB: string = process.env.MONGODB_URI || ''

// const URL_FE: string = process.env.URL_FRONTEND || ''

// const app = express()
// const server = http.createServer(app)
// export const io = new Server(server)

// mongoose.connect(URL_DB)
// .then(() => {
//     const port = 3000

//     app.use((req, res, next) => {
//       res.setHeader('Access-Control-Allow-Origin', URL_FE),
//       res.setHeader('Access-Control-Allow-Methods', '*'),
//       res.setHeader('Access-Control-Allow-Headers', '*')

//       next()
//     })

//     app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
//     app.use(express.json())
//     app.use(router)

//     server.listen(3000, () => console.log(`Server is running port:${port}`))
//   })
//   .catch(() => console.log('Erro ao conectar no mongodb'))


import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { router } from './router';

// Inicializa o Express
const app = express();

// Conecta ao MongoDB
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro no MongoDB:', err));

// Configurações do Express
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_FRONTEND || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use(router);

// Exporta como função serverless do Vercel
export default async function handler(req: Request, res: Response) {
  // Converte a requisição do Vercel para o Express
  app(req, res);
}