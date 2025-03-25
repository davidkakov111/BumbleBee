import fastify from 'fastify';
import cors from '@fastify/cors';

const server = fastify();

// Enable CORS
server.register(cors, {
  origin: '*'
});

// Define the user
const users: { [key: string]: string } = { bumblebee: 'IloveHon3y' };

// /api/login endpoint
server.post('/api/login', async (request, reply) => {
  try {
    const { username, password }: { username?: string, password?: string } = request.body as any;

    if (!username || !password) {
      return reply.status(400).send({ error: 'missing username or password' });
    }

    if (users[username] === password) {
      return reply.send({ authenticated: true });
    }
    return reply.status(403).send({ error: 'unauthorized' });
  } catch (error) {
    console.error('/api/login endpoint error: ', error);
    return reply.status(500).send({ error: 'internal server error' });
  }
});

// /api/order endpoint
server.post('/api/order', async (request, reply) => {
  try {
    const honeys = (request.body as { honeys: {name: string, amount: number}[] }).honeys;

    if (!honeys || !Array.isArray(honeys) || honeys.length === 0) {
      return reply.status(400).send({ error: 'missing or invalid honeys array' });
    }

    for (let honey of honeys) {
      if (!honey.name || !honey.amount) {
        return reply.status(400).send({ error: 'missing honey name or amount' });
      }
    }

    console.log('Sikeres megrendelés: ', honeys);
    return reply.send({ status: 'order successful' });
  } catch (error) {
    console.error('/api/order endpoint error: ', error);
    return reply.status(500).send({ error: 'internal server error' });
  }
});

// Run the server
const port = 5000;
const start = async () => {
  try {
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};
start();
