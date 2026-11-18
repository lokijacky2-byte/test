const Hapi = require('@hapi/hapi');
const config = require('./config');
const plugins = require('./plugins');

let server;

const init = async () => {
  server = Hapi.server({
    host: config.server.host,
    port: config.server.port,
    routes: config.server.routes,
    router: config.server.router
  });

  try {
    console.log('Registering plugins...');
    await server.register(plugins);
    console.log('Plugins registered successfully');

    console.log('Registering routes...');
    
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return {
          status: 'success',
          message: 'Hapi.js server is running',
          timestamp: new Date().toISOString()
        };
      }
    });

    server.route({
      method: 'GET',
      path: '/health',
      handler: (request, h) => {
        return {
          status: 'healthy',
          uptime: process.uptime(),
          timestamp: new Date().toISOString()
        };
      }
    });

    console.log('Routes registered successfully');

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    console.log(`Environment: ${config.server.environment}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

process.on('SIGINT', async () => {
  console.log('Stopping server...');
  await server.stop({ timeout: 10000 });
  console.log('Server stopped');
  process.exit(0);
});

if (require.main === module) {
  init();
}

module.exports = { init, server: () => server };

