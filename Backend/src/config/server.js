require('dotenv').config();

const serverConfig = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  
  routes: {
    cors: {
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['*'],
      credentials: true,
      additionalHeaders: ['cache-control', 'x-requested-with']
    },
    validate: {
      failAction: async (request, h, err) => {
        if (process.env.NODE_ENV === 'production') {
          console.error('ValidationError:', err.message);
          throw err;
        }
        throw err;
      }
    }
  },
  
  router: {
    stripTrailingSlash: true
  }
};

module.exports = serverConfig;

