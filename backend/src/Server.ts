import { env } from '@/env';
import fastify from 'fastify';
import { app } from './App';

app.get('/', (req, reply) => {
  reply.send('Hello, World!');
});

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })
