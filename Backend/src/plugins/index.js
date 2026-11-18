const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

const errorHandlerPlugin = {
  name: 'error-handler',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', (request, h) => {
      const response = request.response;
      
      if (!response.isBoom) {
        return h.continue;
      }
      
      const error = response;
      const statusCode = error.output.statusCode;
      const errorResponse = {
        statusCode,
        error: error.output.payload.error,
        message: error.message
      };
      
      if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = error.stack;
      }
      
      console.error(`[${new Date().toISOString()}] Error ${statusCode}:`, error.message);
      
      return h.response(errorResponse).code(statusCode);
    });
  }
};

const plugins = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: errorHandlerPlugin
  }
];

module.exports = plugins;

