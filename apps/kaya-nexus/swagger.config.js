const swaggerJSDoc = require('swagger-jsdoc');

module.exports = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Kaya Nexus API',
      version: '1.0.0',
      description: 'Documentation des endpoints de l’API Kaya Nexus'
    }
  },
  apis: ['src/app/api/**/*.ts']
};
