const { createServer } = require('http');
const next = require('next');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => handler(req, res));
  server.listen(3000, () => {
    console.log('Next.js server started on port 3000');
  });

  // Start the blockchain service
  require('./app/api/blockchain-service');
});