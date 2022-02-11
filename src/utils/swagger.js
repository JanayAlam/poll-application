const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Poll REST API Docs',
            version: '1.0.0',
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['../routes/includes/*.js', '../models/*.js'],
};

// Exporting the swagger jsdoc with options configured.
export default swaggerJsdoc(options);
