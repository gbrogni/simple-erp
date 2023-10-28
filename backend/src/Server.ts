import { env } from '@/env';
import { app } from './App';

app.get('/', (req, reply) => {
  reply.send('Hello, World!');
});

app
  .listen({
    host: 'localhost',
    port: 3333,
  })
  .then((address) => {
    console.log(`🚀 HTTP Server Running on ${address}`);
  })
  .catch((err) => {
    console.error(`Error starting the server: ${err}`);
  });
