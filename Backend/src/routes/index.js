const exampleRoutes = require('./example.routes');

/**
 * Health check route
 */
const healthRoute = {
  method: 'GET',
  path: '/health',
  handler: (request, h) => {
    return h.response({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    }).code(200);
  },
  options: {
    description: 'Health check endpoint',
    notes: 'Returns the health status of the API',
    tags: ['api', 'health']
  }
};

/**
 * Root route
 */
const rootRoute = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.response({
      message: 'Welcome to Backend Hapi.js API',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        examples: '/api/example'
      }
    }).code(200);
  },
  options: {
    description: 'Root endpoint',
    notes: 'Returns API information and available endpoints',
    tags: ['api', 'info']
  }
};

/**
 * Export all routes
 */
module.exports = [
  rootRoute,
  healthRoute,
  ...exampleRoutes
];

