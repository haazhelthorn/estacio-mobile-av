import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { routes } from './routes'

const app = Fastify({ logger: true });
dotenv.config();

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message })
})

const start = async() => {
  app.register(cors); // api liberada para qlqr ip fazer req
  app.register(routes)

  try{
    await app.listen({ port: 3333, host: "0.0.0.0" });
    console.log(`Servidor rodando em http://localhost:3333`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
  }

start();