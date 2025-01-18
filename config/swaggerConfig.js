const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API documentation for the e-commerce project',
    },
    servers: [{ url: 'http://localhost:5000' }],
    tags: [
      {
        name: 'Authentication',
        description: 'Endpoints related to user authentication (login, register)',
      },
      {
        name: 'Social Authentication',
        description: 'Endpoints for Google and Facebook OAuth-based authentication',
      },
      {
        name: 'Products',
        description: 'Endpoints for managing products',
      },
      {
        name: 'Cart',
        description: 'Endpoints for managing user cart',
      },
      {
        name: 'Payments',
        description: 'Endpoints for processing payments',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Sample Product',
            },
            price: {
              type: 'number',
              example: 100.0,
            },
            description: {
              type: 'string',
              example: 'This is a sample product.',
            },
            category: {
              type: 'string',
              example: 'Electronics',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Adjust path to match your routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
